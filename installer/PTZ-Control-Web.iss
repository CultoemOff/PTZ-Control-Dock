#define MyAppName "PTZ Control Web"
#define MyAppVersion "0.5.0"
#define MyAppPublisher "Culto em Off"
#define MyAppURL "http://127.0.0.1:8765/obs"

[Setup]
AppId={{8C21E916-9B5D-4DA9-B53B-AE84C8216E7D}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={localappdata}\Programs\PTZ Control Web
DefaultGroupName=PTZ Control Web
PrivilegesRequired=lowest
OutputDir=output
OutputBaseFilename=PTZ-Control-Web-Setup
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
UninstallDisplayName={#MyAppName}
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible

[Files]
Source: "..\package\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{autodesktop}\PTZ Control Web"; Filename: "{sys}\wscript.exe"; Parameters: """{app}\open-ptz.vbs"""; WorkingDir: "{app}"
Name: "{group}\PTZ Control Web"; Filename: "{sys}\wscript.exe"; Parameters: """{app}\open-ptz.vbs"""; WorkingDir: "{app}"

[Registry]
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; ValueType: string; ValueName: "PTZ Control Web"; ValueData: """{sys}\wscript.exe"" ""{app}\start-server.vbs"""; Flags: uninsdeletevalue

[Run]
Filename: "{sys}\wscript.exe"; Parameters: """{app}\start-server.vbs"""; Flags: nowait postinstall skipifsilent; Description: "Iniciar o servidor PTZ Control Web"
