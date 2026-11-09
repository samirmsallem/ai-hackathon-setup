# Requirements

## Telemetry fields
`vehicleId` (string), `speedKph` (number), `batteryStateOfCharge` (number, %), `batteryTemperatureC` (number), `vehicleMode` (`PARKED|DRIVING|CHARGING|SERVICE`), `softwareVersion` (`MAJOR.MINOR.PATCH`), `diagnosticCodes` (string[]), `connectivityStatus` (`ONLINE|DEGRADED|OFFLINE`), `timestamp` (ISO 8601).

## Rules (all values come from `reference/validation-rules.json` - never hard-code them)
| Rule | Result |
| --- | --- |
| speedKph outside 0-260 or not a number | finding `SPEED_INVALID` (WARNING), dataQuality SUSPECT |
| SoC outside 0-100 or not a number | `SOC_INVALID` (WARNING), SUSPECT |
| SoC < 20 (and >= 8) | `BATTERY_LOW` WARNING |
| SoC < 8 | `BATTERY_CRITICAL` CRITICAL |
| Battery temp > 55 (and <= 70) | `BATTERY_TEMP_HIGH` WARNING |
| Battery temp > 70 | `BATTERY_TEMP_CRITICAL` CRITICAL |
| Temp outside plausible range or not a number | `TEMP_INVALID` WARNING, SUSPECT |
| connectivity OFFLINE | `CONNECTIVITY_OFFLINE` (severity from rules, WARNING) |
| connectivity DEGRADED | `CONNECTIVITY_DEGRADED` INFO (does not change status) |
| unknown mode / connectivity value | `MODE_INVALID` / `CONNECTIVITY_INVALID` WARNING, SUSPECT |
| age > staleAfterSeconds | `TELEMETRY_STALE` WARNING, SUSPECT |
| timestamp later than evaluationTime + futureToleranceSeconds | `TELEMETRY_FUTURE` WARNING, **REJECTED** |
| unparseable timestamp | `TIMESTAMP_INVALID` WARNING, REJECTED |
| software < minimumVersion | `SOFTWARE_OUTDATED` WARNING; malformed version `VERSION_INVALID` |
| mode/speed contradiction (rules.contradictions) | `CONTRADICTION_<id>` WARNING, SUSPECT |
| known DTC, severity WARNING / CRITICAL | `DTC_WARNING` / `DTC_CRITICAL` (one finding per code) |
| unknown DTC | `DTC_UNKNOWN` WARNING |
| missing field (null/undefined) | `FIELD_MISSING` WARNING, REJECTED |
| diagnosticCodes not string[] | `DIAGNOSTICS_INVALID` WARNING, SUSPECT |

**Status** = highest finding severity (INFO and no findings -> HEALTHY). A critical DTC therefore always yields CRITICAL.
**Checks that depend on an invalid field are skipped** (e.g. no low-battery finding for SoC 120). Boundaries are strict: SoC 20 is healthy, SoC 8 is only a warning, 55 C is healthy.
**dataQuality**: VALID (default) -> SUSPECT -> REJECTED (worst wins).

## Core contract (tests depend on it)
`src/core/evaluate.ts` exports `evaluateTelemetry(telemetry: unknown, rules: Rules, catalog: DiagnosticCodeCatalog, evaluationTime: string): DiagnosticResult`; types in `src/core/types.ts`. Pure, deterministic, never throws on any input. Every finding has non-empty `message`, `explanation`, `recommendedAction`. `recommendedActions` is the de-duplicated list of finding actions; `summary` is a human sentence. Optional AI-written explanations may be added but only behind a deterministic fallback.

## HTTP API (`src/server/index.ts`, exports `startServer(port)`; port 0 = random; default 3001)
- `GET /api/health` -> `{"status":"ok"}`
- `GET /api/scenarios` -> `[{id,name,description}]` (all files in `data/`)
- `GET /api/scenarios/:id` -> scenario plus `result`; 404 if unknown
- `POST /api/evaluate` body `{telemetry, evaluationTime?}` (or bare telemetry) -> `DiagnosticResult`; 400 on invalid JSON
- `GET /api/rules` -> the rules JSON
- Serves `dist/` (built UI) on all other paths.

## UI (React + Vite, `src/web/`)
Scenario selector, overall status badge (colour + text), telemetry table, findings with explanations, interpreted DTCs, recommended actions, and a textarea to evaluate custom JSON. Required `data-testid`s: `scenario-select`, `status-badge`, `telemetry-table`, `finding-item`, `diagnostic-item`, `action-item`, `custom-json-input`, `evaluate-button`. Must be usable at 1024px width, keyboard-operable, and not rely on colour alone.

## Tooling
`npm install`, `dev`, `build`, `test`, `lint`, `validate`, `demo` must work. README must contain setup, usage, architecture overview and how to add a rule/scenario.
