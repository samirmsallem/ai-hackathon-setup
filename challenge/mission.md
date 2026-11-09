# Mission: SDV Vehicle Diagnostics Assistant

Build a working prototype that analyses simulated vehicle telemetry and diagnostic information and helps vehicle engineers understand the current health of a software-defined vehicle (SDV).

The prototype:

1. Loads the provided telemetry scenarios (`data/*.json`).
2. Displays the current vehicle state.
3. Classifies overall status as `HEALTHY`, `WARNING` or `CRITICAL`.
4. Detects invalid, anomalous or critical values.
5. Explains detected problems.
6. Interprets diagnostic trouble codes (`reference/diagnostic-codes.json`).
7. Recommends possible next actions.
8. Offers a simple browser UI.
9. Includes automated tests, setup and usage documentation, and can be started automatically.
10. Is suitable for further development after the workshop.

## The real question
This is not a coding contest. The question is: **which AI engineering approach gets a team from a predefined SDV problem to a validated and extendable prototype most effectively?**
