# Device compatibility matrix

| Environment | Configuration | Result |
|---|---|---|
| GitHub Actions emulator | API 35, x86_64, Pixel 6 profile | Configured; first full build and Maestro run pending |
| Local Android emulator | Not installed in the current development environment | Not tested |
| Physical Android devices | No device session recorded | Not tested |
| Alternate screen size / density | Not configured | Not tested |

The CI emulator is an automated smoke environment. It does not replace physical-device checks for notification reliability, performance, accessibility, or general usability. Record Android API, device/profile, resolution, density, and font scale whenever another device is tested.
