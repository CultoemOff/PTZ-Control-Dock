param([string]$SdkDir=$env:NDI_SDK_DIR)
$ErrorActionPreference='Stop'
if(-not $SdkDir){$candidates=@('C:\Program Files\NDI\NDI 6 SDK','C:\Program Files\NDI\NDI SDK','C:\Program Files\NDI\NDI 5 SDK');$SdkDir=$candidates|Where-Object{Test-Path $_}|Select-Object -First 1}
if(-not $SdkDir){throw 'NDI SDK not found. Install the NDI SDK or set NDI_SDK_DIR.'}
if(-not (Get-Command cmake -ErrorAction SilentlyContinue)){throw 'CMake not found. Install CMake and Visual Studio Build Tools (Desktop development with C++).'}
$here=Split-Path -Parent $MyInvocation.MyCommand.Path
cmake -S $here -B (Join-Path $here 'build') -A x64 -DNDI_SDK_DIR="$SdkDir"
cmake --build (Join-Path $here 'build') --config Release
$exe=Join-Path $here 'bin\Release\ndi-ptz-bridge.exe'
if(-not (Test-Path $exe)){$exe=Join-Path $here 'bin\ndi-ptz-bridge.exe'}
if(-not (Test-Path $exe)){throw 'Build completed but ndi-ptz-bridge.exe was not found.'}
$target=Join-Path $here 'bin\ndi-ptz-bridge.exe'
if($exe -ne $target){Copy-Item $exe $target -Force}
Write-Host "NDI PTZ bridge ready: $target" -ForegroundColor Green
