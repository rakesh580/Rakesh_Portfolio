#!/usr/bin/env python3
"""Remove U+2014 em-dashes from the portfolio source.

Replacement strategy chosen after manually reviewing the em-dash contexts
in this codebase:

  1. Title-style separators surrounded by short tokens → U+00B7 "·"
     (matches the portfolio's existing separator convention in meta tags
      and tech stacks).
  2. Prose / narrative em-dashes (longer phrases either side) → ", ".
  3. Leading em-dash (" DASH X" at EOL) → " ·" or dropped.

The heuristic: if the left-hand side up to the last newline or the
right-hand side up to the next newline is ≤ 30 characters AND contains
no sentence punctuation, treat it as a title separator; otherwise it's
prose.

Runs over every tsx/ts/tsx/py/md/html/json/css file in the repo, skipping
node_modules, dist, .git, and binary files.
"""
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

SKIP_DIRS = {'node_modules', 'dist', '.git', 'public', 'scripts'}
TEXT_EXT = {'.ts', '.tsx', '.js', '.jsx', '.py', '.md', '.html', '.json', '.css', '.yml', '.yaml'}

EM_DASH = '\u2014'


def classify_context(text: str, idx: int) -> str:
    """Decide 'title' vs 'prose' based on surrounding tokens."""
    # left = slice back to last newline or quote
    start = max(
        text.rfind('\n', 0, idx),
        text.rfind('"', 0, idx),
        text.rfind("'", 0, idx),
        text.rfind('`', 0, idx),
        text.rfind('>', 0, idx),
    ) + 1
    left = text[start:idx].strip()

    # right = slice forward to next newline or quote/tag
    end_candidates = [p for p in (
        text.find('\n', idx + 1),
        text.find('"', idx + 1),
        text.find("'", idx + 1),
        text.find('`', idx + 1),
        text.find('<', idx + 1),
    ) if p != -1]
    end = min(end_candidates) if end_candidates else len(text)
    right = text[idx + 1:end].strip()

    # If either side is short AND clean, treat as title separator.
    def looks_titlelike(s: str) -> bool:
        if len(s) == 0 or len(s) > 30:
            return False
        if re.search(r'[.!?,;:]', s):
            return False
        return True

    if looks_titlelike(left) and looks_titlelike(right):
        return 'title'
    return 'prose'


def transform(text: str) -> tuple[str, int]:
    """Return (new_text, replacements)."""
    out = []
    i = 0
    count = 0
    while i < len(text):
        ch = text[i]
        if ch != EM_DASH:
            out.append(ch)
            i += 1
            continue

        # Collapse surrounding single spaces before choosing replacement.
        prev_space = i > 0 and text[i - 1] == ' '
        next_space = i + 1 < len(text) and text[i + 1] == ' '

        kind = classify_context(text, i)

        if kind == 'title':
            # replace " DASH " with " · " (keep spaces)
            if prev_space and not out[-1:] == [' ']:
                pass  # already handled
            if prev_space:
                out[-1] = ' '  # keep as-is
            repl = '·'
            out.append(repl)
        else:
            # prose: ", " DASH kill leading space of the original " DASH "
            if prev_space and out and out[-1] == ' ':
                out.pop()  # drop the space before ","
            out.append(',')
            if not next_space:
                out.append(' ')

        count += 1
        i += 1

    return ''.join(out), count


def process_file(path: str) -> int:
    try:
        with open(path, 'r', encoding='utf-8') as f:
            text = f.read()
    except Exception:
        return 0
    if EM_DASH not in text:
        return 0
    new_text, n = transform(text)
    if new_text != text:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_text)
    return n


def main():
    total = 0
    files_touched = 0
    for root, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for name in files:
            ext = os.path.splitext(name)[1].lower()
            if ext not in TEXT_EXT:
                continue
            path = os.path.join(root, name)
            n = process_file(path)
            if n:
                total += n
                files_touched += 1
                rel = os.path.relpath(path, ROOT)
                print(f'  - {rel}: replaced {n}')
    print(f'\nTotal: {total} em-dashes replaced across {files_touched} files.')


if __name__ == '__main__':
    sys.exit(main())
