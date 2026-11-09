# Domain context

A **software-defined vehicle (SDV)** delivers many functions through software that can be updated over the air (OTA). Engineers monitor fleets through telemetry: periodic records of signals such as speed, high-voltage battery state of charge (SoC) and temperature, operating mode, software version and active diagnostic trouble codes (DTCs).

- **SoC**: percentage of usable battery energy. Very low SoC limits range and, at the extreme, drive capability.
- **Battery temperature**: high temperatures degrade cells and, in extreme cases, risk thermal events. Thermal management should react well before 70 C.
- **DTC**: standardised fault code. Prefixes: P powertrain, C chassis, B body, U network. The catalog in `reference/diagnostic-codes.json` is a simplified teaching set, not an OEM catalog.
- **Staleness**: a record older than a few minutes may not describe the present. A timestamp in the future usually means a clock problem; such data is rejected.
- **Contradictions**: signals that cannot be true together (e.g. PARKED at 87 km/h) indicate a sensor, signal-mapping or software fault.
- **Connectivity**: OFFLINE vehicles cannot receive OTA updates or remote commands, and telemetry may be outdated.
- **Software version**: fleets define a minimum supported version; older vehicles may lack fixes.

All data in this repository is synthetic.
