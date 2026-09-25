param([string]$SdkDir=$env:NDI_SDK_DIR)
$ErrorActionPreference='Stop'
if(-not $SdkDir){$candidates=@('C:\Program Files\NDI\NDI 6 SDK','C:\Program Files\NDI\NDI SDK','C:\Program Files\NDI\NDI 5 SDK');$SdkDir=$candidates|Where-Object{Test-Path $_}|Select-Object -First 1}
if(-not $SdkDir){throw 'NDI SDK not found. Install the NDI SDK or set NDI_SDK_DIR.'}
if(-not (Get-Command cmake -ErrorAction SilentlyContinue)){throw 'CMake not found. Install CMake and Visual Studio Build Tools (Desktop development with C++).'}
$here=Split-Path -Parent $MyInvocation.MyCommand.Path
$build=Join-Path $here 'build'
if(Test-Path $build){Remove-Item $build -Recurse -Force}
$vswhere=Join-Path ${env:ProgramFiles(x86)} 'Microsoft Visual Studio\Installer\vswhere.exe'
$vs=$null
if(Test-Path $vswhere){$vs=& $vswhere -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath}
if($vs){
  Write-Host "Using Visual Studio generator (x64): $vs" -ForegroundColor Cyan
  cmake -S $here -B $build -G "Visual Studio 17 2022" -A x64 -DNDI_SDK_DIR="$SdkDir"
}else{
  Write-Host "Visual Studio C++ tools not detected; trying Ninja/NMake environment." -ForegroundColor Yellow
  if(Get-Command ninja -ErrorAction SilentlyContinue){cmake -S $here -B $build -G Ninja -DNDI_SDK_DIR="$SdkDir"}else{cmake -S $here -B $build -G "NMake Makefiles" -DNDI_SDK_DIR="$SdkDir"}
}
if($LASTEXITCODE -ne 0){throw 'CMake configuration failed. Ensure Visual Studio Build Tools includes Desktop development with C++.'}
cmake --build $build --config Release
if($LASTEXITCODE -ne 0){throw 'NDI bridge compilation failed.'}
$exe=Join-Path $here 'bin\Release\ndi-ptz-bridge.exe'
if(-not (Test-Path $exe)){$exe=Join-Path $here 'bin\ndi-ptz-bridge.exe'}
if(-not (Test-Path $exe)){throw 'Build completed but ndi-ptz-bridge.exe was not found.'}
$target=Join-Path $here 'bin\ndi-ptz-bridge.exe'
if($exe -ne $target){Copy-Item $exe $target -Force}
$ndiDll=Join-Path $SdkDir 'Bin\x64\Processing.NDI.Lib.x64.dll'
if(-not (Test-Path $ndiDll)){
  $ndiDll='C:\Program Files\NDI\NDI 6 Runtime\v6\Processing.NDI.Lib.x64.dll'
}
if(-not (Test-Path $ndiDll)){throw 'Processing.NDI.Lib.x64.dll was not found in the NDI SDK or NDI 6 Runtime.'}
Copy-Item $ndiDll (Join-Path $here 'bin\Processing.NDI.Lib.x64.dll') -Force
Write-Host "NDI runtime DLL copied beside bridge." -ForegroundColor Green
Write-Host "NDI PTZ bridge ready: $target" -ForegroundColor Green
