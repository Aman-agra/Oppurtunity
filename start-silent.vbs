Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "D:\ALL PROJECTS\opportunity-hunter"
WshShell.Run "node dist\index.js", 0, False
