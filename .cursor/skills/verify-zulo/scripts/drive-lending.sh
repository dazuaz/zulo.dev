#!/usr/bin/env bash
# Request /lending/ on the built site and record the title and description.
set -euo pipefail

root="$(cd "$(dirname "$0")/../../../.." && pwd)"
html="$root/.vercel/output/static/lending/index.html"
port=4323
evidence=/tmp/verify-zulo-evidence
pidfile=/tmp/verify-zulo-server.pid

if [ ! -f "$html" ]; then
	printf 'missing %s. Run bun run build from the repo root first.\n' "$html" >&2
	exit 1
fi

mkdir -p "$evidence"

if [ ! -f "$pidfile" ] || ! kill -0 "$(cat "$pidfile")" 2>/dev/null; then
	python3 -m http.server "$port" --bind 127.0.0.1 --directory "$root/.vercel/output/static" >"$evidence/server.log" 2>&1 &
	echo $! >"$pidfile"
fi

ok=0
for _ in 1 2 3 4 5 6 7 8 9 10; do
	if curl -sf -o /dev/null "http://127.0.0.1:$port/lending/"; then
		ok=1
		break
	fi
	sleep 0.2
done
if [ "$ok" -ne 1 ]; then
	printf 'lending page did not answer on port %s\n' "$port" >&2
	exit 1
fi

curl -s "http://127.0.0.1:$port/lending/" | python3 -c '
import sys, re
text = sys.stdin.read()
title = re.search(r"<title>(.*?)</title>", text).group(1)
desc = re.search(r"<meta name=\"description\" content=\"(.*?)\">", text).group(1)
assert title == "Private Lending Systems | Zulo", title
assert ">Lending<" in text, "nav missing Lending"
assert "href=\"/demo\"" in text, "demo link missing"
assert "href=\"/work/vaster-agent\"" in text, "case study link missing"
print(title)
print(desc)
' | tee "$evidence/lending.txt"

printf 'evidence %s/lending.txt\n' "$evidence"
