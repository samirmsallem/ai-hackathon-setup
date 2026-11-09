import type {
  DataQuality, DiagnosticCodeCatalog, DiagnosticResult, Finding, InterpretedDiagnostic,
  Rules, Severity, Status,
} from '../../../../src/core/types.ts';

const rank: Record<Severity, number> = { INFO: 0, WARNING: 1, CRITICAL: 2 };
const SEMVER = /^(\d+)\.(\d+)\.(\d+)$/;

export function compareVersions(a: string, b: string): number {
  const pa = SEMVER.exec(a)!.slice(1).map(Number);
  const pb = SEMVER.exec(b)!.slice(1).map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] < pb[i] ? -1 : 1;
  return 0;
}
const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

export function evaluateTelemetry(
  input: unknown, rules: Rules, catalog: DiagnosticCodeCatalog, evaluationTime: string,
): DiagnosticResult {
  const t = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;
  const findings: Finding[] = [];
  let quality: DataQuality = 'VALID';
  const degrade = (q: DataQuality) => { if (quality === 'VALID') quality = q; };
  const add = (code: string, severity: Severity, field: string, message: string, explanation: string, recommendedAction: string) =>
    findings.push({ code, severity, field, message, explanation, recommendedAction });

  for (const f of ['vehicleId','speedKph','batteryStateOfCharge','batteryTemperatureC','vehicleMode','softwareVersion','diagnosticCodes','connectivityStatus','timestamp'])
    if (t[f] === undefined || t[f] === null) {
      add('FIELD_MISSING', 'WARNING', f, `Required field ${f} is missing.`, 'The telemetry record is incomplete and cannot be fully assessed.', 'Check the telemetry producer and schema.');
      quality = 'REJECTED';
    }

  const now = Date.parse(evaluationTime);
  const speedOk = isNum(t.speedKph) && t.speedKph >= rules.speedKph.min && t.speedKph <= rules.speedKph.max;
  if (t.speedKph !== undefined && t.speedKph !== null && !speedOk) {
    add('SPEED_INVALID', 'WARNING', 'speedKph', `Speed ${String(t.speedKph)} km/h is outside ${rules.speedKph.min}-${rules.speedKph.max}.`, 'The value is physically implausible, which points to a sensor, signal or encoding fault.', 'Inspect the speed signal source and validate against wheel speed sensors.');
    degrade('SUSPECT');
  }

  const soc = t.batteryStateOfCharge;
  const socCfg = rules.batteryStateOfCharge;
  if (soc !== undefined && soc !== null) {
    if (!isNum(soc) || soc < socCfg.min || soc > socCfg.max) {
      add('SOC_INVALID', 'WARNING', 'batteryStateOfCharge', `State of charge ${String(soc)} is outside ${socCfg.min}-${socCfg.max}.`, 'The value cannot be a valid percentage.', 'Check the battery management system signal.');
      degrade('SUSPECT');
    } else if (soc < socCfg.criticalBelow)
      add('BATTERY_CRITICAL', 'CRITICAL', 'batteryStateOfCharge', `State of charge ${soc}% is critically low.`, `Below the critical threshold of ${socCfg.criticalBelow}%; the vehicle may lose drive capability.`, 'Charge immediately and limit vehicle usage.');
    else if (soc < socCfg.warningBelow)
      add('BATTERY_LOW', 'WARNING', 'batteryStateOfCharge', `State of charge ${soc}% is low.`, `Below the warning threshold of ${socCfg.warningBelow}%.`, 'Plan charging soon.');
  }

  const temp = t.batteryTemperatureC;
  const tc = rules.batteryTemperatureC;
  if (temp !== undefined && temp !== null) {
    if (!isNum(temp) || temp < tc.plausibleMin || temp > tc.plausibleMax) {
      add('TEMP_INVALID', 'WARNING', 'batteryTemperatureC', `Battery temperature ${String(temp)} C is implausible.`, 'The value is outside the sensor plausibility range.', 'Check the temperature sensor.');
      degrade('SUSPECT');
    } else if (temp > tc.criticalAbove)
      add('BATTERY_TEMP_CRITICAL', 'CRITICAL', 'batteryTemperatureC', `Battery temperature ${temp} C is critical.`, `Above ${tc.criticalAbove} C; thermal runaway risk.`, 'Stop charging, reduce load, and inspect the thermal management system.');
    else if (temp > tc.warningAbove)
      add('BATTERY_TEMP_HIGH', 'WARNING', 'batteryTemperatureC', `Battery temperature ${temp} C is high.`, `Above the warning threshold of ${tc.warningAbove} C.`, 'Reduce load and check cooling.');
  }

  if (t.vehicleMode !== undefined && t.vehicleMode !== null && !rules.vehicleModes.includes(String(t.vehicleMode))) {
    add('MODE_INVALID', 'WARNING', 'vehicleMode', `Unknown vehicle mode ${String(t.vehicleMode)}.`, `Allowed modes: ${rules.vehicleModes.join(', ')}.`, 'Check the mode signal mapping.');
    degrade('SUSPECT');
  }

  const cs = t.connectivityStatus;
  if (cs !== undefined && cs !== null) {
    if (!rules.connectivity.allowed.includes(String(cs))) {
      add('CONNECTIVITY_INVALID', 'WARNING', 'connectivityStatus', `Unknown connectivity status ${String(cs)}.`, `Allowed: ${rules.connectivity.allowed.join(', ')}.`, 'Check the connectivity module reporting.');
      degrade('SUSPECT');
    } else if (cs === 'OFFLINE')
      add('CONNECTIVITY_OFFLINE', rules.connectivity.offlineSeverity, 'connectivityStatus', 'Vehicle is offline.', 'No live telemetry or remote commands are possible.', 'Check network coverage and the telematics unit.');
    else if (cs === 'DEGRADED')
      add('CONNECTIVITY_DEGRADED', rules.connectivity.degradedSeverity, 'connectivityStatus', 'Connectivity is degraded.', 'Telemetry may be delayed.', 'Monitor connection quality.');
  }

  if (t.timestamp !== undefined && t.timestamp !== null) {
    const ts = typeof t.timestamp === 'string' ? Date.parse(t.timestamp) : NaN;
    if (Number.isNaN(ts)) {
      add('TIMESTAMP_INVALID', 'WARNING', 'timestamp', 'Timestamp is not a valid ISO 8601 date.', 'Freshness cannot be assessed.', 'Fix the timestamp format at the source.');
      quality = 'REJECTED';
    } else {
      const ageSec = (now - ts) / 1000;
      if (ageSec < -rules.timestamp.futureToleranceSeconds) {
        add('TELEMETRY_FUTURE', 'WARNING', 'timestamp', 'Timestamp lies in the future.', 'The record is rejected because the clock or ordering is unreliable.', 'Check clock synchronization of the vehicle.');
        quality = 'REJECTED';
      } else if (ageSec > rules.timestamp.staleAfterSeconds) {
        add('TELEMETRY_STALE', 'WARNING', 'timestamp', `Telemetry is ${Math.round(ageSec)} s old.`, `Older than ${rules.timestamp.staleAfterSeconds} s, so it may not reflect the current state.`, 'Wait for fresh telemetry or check the uplink.');
        degrade('SUSPECT');
      }
    }
  }

  if (t.softwareVersion !== undefined && t.softwareVersion !== null) {
    if (typeof t.softwareVersion !== 'string' || !SEMVER.test(t.softwareVersion)) {
      add('VERSION_INVALID', 'WARNING', 'softwareVersion', 'Software version is not MAJOR.MINOR.PATCH.', 'Update status cannot be assessed.', 'Fix version reporting.');
      degrade('SUSPECT');
    } else if (compareVersions(t.softwareVersion, rules.software.minimumVersion) < 0)
      add('SOFTWARE_OUTDATED', rules.software.outdatedSeverity, 'softwareVersion', `Software ${t.softwareVersion} is below minimum ${rules.software.minimumVersion}.`, 'Outdated software may lack fixes.', 'Schedule an OTA update.');
  }

  if (speedOk && typeof t.vehicleMode === 'string')
    for (const c of rules.contradictions)
      if (t.vehicleMode === c.mode && (t.speedKph as number) > c.speedAbove) {
        add(`CONTRADICTION_${c.id}`, c.severity, 'vehicleMode', `Mode ${c.mode} contradicts speed ${t.speedKph} km/h.`, c.explanation, 'Verify mode and speed signals.');
        degrade('SUSPECT');
      }

  const diagnostics: InterpretedDiagnostic[] = [];
  if (t.diagnosticCodes !== undefined && t.diagnosticCodes !== null) {
    if (!Array.isArray(t.diagnosticCodes) || t.diagnosticCodes.some((c) => typeof c !== 'string')) {
      add('DIAGNOSTICS_INVALID', 'WARNING', 'diagnosticCodes', 'diagnosticCodes must be an array of strings.', 'DTCs cannot be interpreted.', 'Fix the producer.');
      degrade('SUSPECT');
    } else
      for (const code of t.diagnosticCodes as string[]) {
        const e = catalog[code];
        if (e) {
          diagnostics.push({ code, known: true, ...e });
          add(e.severity === 'CRITICAL' ? 'DTC_CRITICAL' : 'DTC_WARNING', e.severity, 'diagnosticCodes', `${code}: ${e.description}`, `Reported by the ${e.system} system.`, e.recommendedAction);
        } else {
          diagnostics.push({ code, known: false, description: 'Unknown diagnostic trouble code', system: 'Unknown', severity: 'WARNING', recommendedAction: 'Look up the code in the OEM service documentation.' });
          add('DTC_UNKNOWN', 'WARNING', 'diagnosticCodes', `${code}: unknown trouble code.`, 'The code is not part of the known catalog.', 'Look up the code in the OEM service documentation.');
        }
      }
  }

  const top = findings.reduce((m, f) => Math.max(m, rank[f.severity]), 0);
  const status: Status = top === 2 ? 'CRITICAL' : top === 1 ? 'WARNING' : 'HEALTHY';
  const recommendedActions = [...new Set(findings.map((f) => f.recommendedAction))];
  const vehicleId = typeof t.vehicleId === 'string' ? t.vehicleId : null;
  const summary = findings.length === 0
    ? `Vehicle ${vehicleId ?? 'unknown'} is healthy. No issues detected.`
    : `Vehicle ${vehicleId ?? 'unknown'} is ${status}: ${findings.length} finding(s) - ${[...new Set(findings.map((f) => f.code))].join(', ')}.`;
  return { vehicleId, status, dataQuality: quality, evaluatedAt: evaluationTime, findings, diagnostics, recommendedActions, summary };
}
