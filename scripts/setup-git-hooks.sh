#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"

cd "$repo_root"

git config core.hooksPath .githooks
chmod +x .githooks/pre-push

cat <<'MSG'
CrisisCoord git hooks installed.

Direct pushes to main are now blocked locally.
Work from a feature branch and open a pull request into main.
MSG
