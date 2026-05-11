# Write-Host "脚本所在目录: $(Split-Path -Parent $MyInvocation.MyCommand.Definition)" -ForegroundColor Cyan
# Write-Host "当前工作目录: $(Get-Location)" -ForegroundColor Yellow

# ========== 将脚本中的目录（工作目录）切换到脚本所在目录 ==========
# $scriptPath = $MyInvocation.MyCommand.Path
# $scriptDir = Split-Path -Parent $scriptPath
$scriptDir = "E:/1_Project/TlongsPage/MyGitPage/TlongsGitPage"
Set-Location $scriptDir
Write-Host "已自动切换到项目目录：$scriptDir" -ForegroundColor Cyan

# 获取本机局域网 IPv4 地址（排除环回）
$ip = Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
    $_.InterfaceAlias -notmatch "Loopback|vEthernet" -and $_.IPAddress -match "^(192\.168|10\.|172\.1[6-9]\.|172\.2[0-9]\.|172\.3[0-1]\.)"
} | Select-Object -First 1 -ExpandProperty IPAddress

if (-not $ip) {
    Write-Host "错误：未能检测到有效的局域网 IPv4 地址。" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

Write-Host "检测到 IP 地址：$ip" -ForegroundColor Green
Write-Host "正在启动 Hugo 服务器（允许局域网访问）..."
Write-Host "请确保防火墙已允许 1313 端口的入站连接，否则手机无法访问。" -ForegroundColor Yellow
Write-Host "访问地址：http://$($ip):1313"
Write-Host "按 Ctrl+C 可停止服务器。`n"



hugo server --bind=0.0.0.0 --baseURL="http://$($ip):1313"



