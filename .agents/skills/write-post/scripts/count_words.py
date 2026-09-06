#!/usr/bin/env python3
"""Count ordinary Markdown prose using the write-post skill's convention."""

import argparse
import html
import re
from pathlib import Path

# One nested parenthesis level covers common Markdown URL targets.
TARGET = r"\((?:[^()\n]|\([^()\n]*\))*\)"
WORD = re.compile(r"[^\W_]+(?:['’\-][^\W_]+)*", re.UNICODE)


def count_words(markdown: str) -> int:
    text = markdown.lstrip("\ufeff")
    if re.match(r"\A---[ \t]*\r?\n", text):
        frontmatter = re.match(r"\A---[ \t]*\r?\n.*?\r?\n---[ \t]*(?:\r?\n|$)", text, re.S)
        if not frontmatter:
            raise ValueError("Unclosed YAML frontmatter")
        text = text[frontmatter.end():]
    text = re.sub(r"<!--[\s\S]*?-->", " ", text)
    lines = []
    fence = None
    for line in text.splitlines():
        # Strip blockquote prefixes before recognizing quoted code fences.
        line = re.sub(r"^(?: {0,3}>[ \t]?)+", "", line)
        marker = re.match(r"^ {0,3}(`{3,}|~{3,})(.*)$", line)
        if fence:
            if marker and marker[1][0] == fence[0] and len(marker[1]) >= len(fence) and not marker[2].strip():
                fence = None
            continue
        if marker:
            fence = marker[1]
            continue
        if line.strip() and line.startswith(("    ", "\t")):
            raise ValueError("Ambiguous indentation: use fenced code and flat prose lists for counting")
        if re.match(r"^ {0,3}\[[^]\n]+\]:", line):
            continue
        lines.append(line)
    if fence:
        raise ValueError("Unclosed Markdown code fence")
    text = "\n".join(lines)
    text = re.sub(r"!\[[^]\n]*\](?:" + TARGET + r"|\[[^]\n]*\])?", " ", text)
    text = re.sub(r"\[([^]\n]+)\]" + TARGET, r"\1", text)
    text = re.sub(r"\[([^]\n]+)\]\[[^]\n]*\]", r"\1", text)
    text = re.sub(r"<[^>]*>", " ", text)
    text = re.sub(r"(?:https?://|www\.)[^\s<>]+", " ", text)
    text = re.sub(r"(?m)^\s*(?:[-+*]|\d+[.)])\s+", "", text)
    return len(WORD.findall(html.unescape(text)))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("post", type=Path)
    parser.add_argument("--min", type=int, default=1200, dest="minimum")
    parser.add_argument("--max", type=int, default=1800, dest="maximum")
    args = parser.parse_args()
    if not 0 <= args.minimum <= args.maximum:
        parser.error("Require 0 <= min <= max")
    try:
        count = count_words(args.post.read_text(encoding="utf-8"))
    except (OSError, ValueError) as error:
        parser.exit(2, f"{error}\n")
    passed = args.minimum <= count <= args.maximum
    print(f"{count} prose words; target {args.minimum}–{args.maximum}; {'PASS' if passed else 'OUT OF RANGE'}")
    return 0 if passed else 1


if __name__ == "__main__":
    raise SystemExit(main())
