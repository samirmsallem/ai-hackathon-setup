import type { DiagnosticCodeCatalog, DiagnosticResult, Rules } from './types.ts';

/**
 * STARTER STUB - this is what the hackathon teams must implement (via their AI tooling).
 * Contract: see challenge/requirements.md, section "Core contract".
 * Must be pure and deterministic: no Date.now(), no network, no randomness.
 * Must tolerate arbitrary JSON input (missing fields, wrong types).
 */
export function evaluateTelemetry(
  _telemetry: unknown,
  _rules: Rules,
  _catalog: DiagnosticCodeCatalog,
  _evaluationTime: string,
): DiagnosticResult {
  throw new Error('NOT_IMPLEMENTED: evaluateTelemetry');
}
