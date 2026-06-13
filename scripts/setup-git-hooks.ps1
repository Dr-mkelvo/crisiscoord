$ErrorActionPreference = "Stop"

$repoRoot = git rev-parse --show-toplevel
Set-Location $repoRoot

git config core.hooksPath .githooks

$chmod = Get-Command chmod -ErrorAction SilentlyContinue
if ($chmod) {
  chmod +x .githooks/pre-push
}

Write-Host ""
Write-Host "CrisisCoord git hooks installed."
Write-Host ""
Write-Host "Direct pushes to main are now blocked locally."
Write-Host "Work from a feature branch and open a pull request into main."
