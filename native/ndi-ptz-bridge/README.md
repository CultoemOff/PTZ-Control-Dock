# NDI PTZ bridge

PTZ Control Web uses the official NDI SDK receiver PTZ API through a small native bridge. The NDI SDK/runtime is intentionally **not committed to this public repository**.

## Windows build
1. Download/install the current NDI SDK/Runtime from NDI.
2. Install CMake and Visual Studio Build Tools (Desktop development with C++).
3. From this directory run:

```powershell
cmake -S . -B build -A x64 -DNDI_SDK_DIR="C:\Program Files\NDI\NDI 6 SDK"
cmake --build build --config Release
```

The backend looks for `native/ndi-ptz-bridge/bin/ndi-ptz-bridge.exe`. You can override that path with `NDI_PTZ_BRIDGE`.

The bridge uses the official receiver PTZ calls for discovery, pan/tilt speed, zoom speed, focus/autofocus and presets. A camera must advertise PTZ support through NDI.
