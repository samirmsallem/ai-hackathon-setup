// Shared contract. Do NOT change names/shapes: acceptance tests and scripts depend on them.
export type Status = 'HEALTHY' | 'WARNING' | 'CRITICAL';
export type Severity = 'INFO' | 'WARNING' | 'CRITICAL';
export type DataQuality = 'VALID' | 'SUSPECT' | 'REJECTED';

export interface Telemetry {
  vehicleId: string;
  speedKph: number;
  batteryStateOfCharge: number;
  batteryTemperatureC: number;
  vehicleMode: string;
  softwareVersion: string;
  diagnosticCodes: string[];
  connectivityStatus: string;
  timestamp: string; // ISO 8601
}

export interface Finding {
  code: string; // e.g. BATTERY_LOW, see challenge/requirements.md
  severity: Severity;
  field: string;
  message: string;
  explanation: string;
  recommendedAction: string;
}

export interface InterpretedDiagnostic {
  code: string;
  known: boolean;
  description: string;
  system: string;
  severity: Severity;
  recommendedAction: string;
}

export interface DiagnosticResult {
  vehicleId: string | null;
  status: Status;
  dataQuality: DataQuality;
  evaluatedAt: string;
  findings: Finding[];
  diagnostics: InterpretedDiagnostic[];
  recommendedActions: string[];
  summary: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  evaluationTime: string;
  telemetry: Telemetry;
}

/** Shape of reference/validation-rules.json */
export interface Rules {
  version: string;
  speedKph: { min: number; max: number };
  batteryStateOfCharge: { min: number; max: number; warningBelow: number; criticalBelow: number };
  batteryTemperatureC: {
    plausibleMin: number;
    plausibleMax: number;
    warningAbove: number;
    criticalAbove: number;
  };
  timestamp: { staleAfterSeconds: number; futureToleranceSeconds: number };
  connectivity: { allowed: string[]; offlineSeverity: Severity; degradedSeverity: Severity };
  vehicleModes: string[];
  software: { minimumVersion: string; outdatedSeverity: Severity };
  contradictions: {
    id: string;
    mode: string;
    speedAbove: number;
    severity: Severity;
    explanation: string;
  }[];
}

export type DiagnosticCodeCatalog = Record<
  string,
  { description: string; system: string; severity: Severity; recommendedAction: string }
>;
