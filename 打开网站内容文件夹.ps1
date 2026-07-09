# open-folder.ps1
param(
    [Parameter(Mandatory=$true)]
    [string]$FolderPath
)

if (Test-Path $FolderPath -PathType Container) {
    Write-Host "正在使用 VS Code 打开: $FolderPath"
    code -n $FolderPath
} else {
    Write-Host "错误：文件夹 '$FolderPath' 不存在！" -ForegroundColor Red
}