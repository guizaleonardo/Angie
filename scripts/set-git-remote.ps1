# Configura origin con usuario y PAT en la URL.
# GitHub no acepta la contraseña de la cuenta: usa un Personal Access Token.
#
# Uso:
#   powershell -ExecutionPolicy Bypass -File .\scripts\set-git-remote.ps1
#   powershell -ExecutionPolicy Bypass -File .\scripts\set-git-remote.ps1 -User "guizaleonardo"
#
# El token queda en .git/config (texto plano). No subas ese archivo ni el token a git.

param(
  [string]$User = "guizaleonardo",
  [string]$Token,
  [string]$RemoteUrl = "https://github.com/guizaleonardo/Angie.git",
  [string]$RemoteName = "origin"
)

$ErrorActionPreference = "Stop"
Set-Location (Split-Path -Parent $PSScriptRoot)

if (-not $User) {
  $User = Read-Host "Usuario de GitHub"
}

if (-not $Token) {
  $secure = Read-Host "Personal Access Token (PAT)" -AsSecureString
  $ptr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try {
    $Token = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
  }
  finally {
    [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
  }
}

if (-not $User -or -not $Token) {
  Write-Error "Faltan usuario o token."
  exit 1
}

$encodedUser = [Uri]::EscapeDataString($User)
$encodedToken = [Uri]::EscapeDataString($Token)
$uri = [Uri]$RemoteUrl
$authUrl = "{0}://{1}:{2}@{3}{4}" -f $uri.Scheme, $encodedUser, $encodedToken, $uri.Host, $uri.AbsolutePath

$existing = git remote 2>$null
if ($existing -match ("^" + [regex]::Escape($RemoteName) + "$")) {
  git remote set-url $RemoteName $authUrl
} else {
  git remote add $RemoteName $authUrl
}

Write-Host "Remoto '$RemoteName' actualizado para el usuario $User."
Write-Host "Siguiente paso: git push -u $RemoteName main"
Write-Host "Cuando termines, revoca el PAT si lo compartiste y quita la contraseña de la URL con:"
Write-Host "  git remote set-url $RemoteName $RemoteUrl"
