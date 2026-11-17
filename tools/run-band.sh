#!/bin/sh
# Writes and checks one band, then gives each rejected slot one fresh try.
# Usage: sh tools/run-band.sh b4
set -e
cd "$(dirname "$0")/.."
node tools/write.mjs "$1" --vocab 40
node tools/check.mjs "$1"
for f in tools/work/"$1"/"$1"-*.json; do
  if node -e "process.exit(require('./$f').status === 'rejected' ? 0 : 1)"; then rm "$f"; fi
done
node tools/write.mjs "$1" --vocab 40
node tools/check.mjs "$1"
