Option Explicit
Dim shell, fso, appDir, nodeExe, serverJs
Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
appDir = fso.GetParentFolderName(WScript.ScriptFullName)
nodeExe = fso.BuildPath(appDir, "runtime\node.exe")
serverJs = fso.BuildPath(appDir, "app\dist\server\index.js")
shell.CurrentDirectory = fso.BuildPath(appDir, "app")
shell.Run """" & nodeExe & """ """ & serverJs & """", 0, False
