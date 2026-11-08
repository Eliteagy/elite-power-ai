#!/usr/bin/env python3
"""
token-saver skill — smart_read.py
Reads only a specific range of lines from a file, or prints a cached
summary if the file hasn't changed since last read.
Usage: python smart_read.py --file <path> [--lines <start>-<end>] [--summary]
"""

import argparse
import hashlib
import json
import os

SESSION_DIR = ".session"
CACHE_FILE = os.path.join(SESSION_DIR, "read_cache.json")

def load_cache() -> dict:
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE) as f:
            return json.load(f)
    return {}

def save_cache(cache: dict):
    os.makedirs(SESSION_DIR, exist_ok=True)
    with open(CACHE_FILE, "w") as f:
        json.dump(cache, f, indent=2)

def file_hash(path: str) -> str:
    with open(path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()

def smart_read(file_path: str, line_range: str | None, summary_only: bool):
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return

    cache = load_cache()
    current_hash = file_hash(file_path)
    cached = cache.get(file_path, {})

    if cached.get("hash") == current_hash and not line_range:
        print(f"📋 CACHE HIT — {file_path} (unchanged since last read)")
        print(f"   Lines: {cached.get('total_lines')}")
        print(f"   Last read: {cached.get('last_read')}")
        if cached.get("summary"):
            print(f"\n   Summary: {cached['summary']}")
        print("\n   ⚡ Skipping full read — file unchanged. Use --lines to read a section.")
        return

    with open(file_path) as f:
        all_lines = f.readlines()

    total = len(all_lines)

    if summary_only:
        # Show first 5 and last 3 lines as a structural preview
        preview_lines = all_lines[:5] + (["   ...\n"] if total > 8 else []) + all_lines[-3:]
        print(f"📄 SUMMARY — {file_path} ({total} lines)")
        print("".join(preview_lines))
    elif line_range:
        try:
            start_str, end_str = line_range.split("-")
            start = int(start_str) - 1
            end = int(end_str)
            selected = all_lines[start:end]
            print(f"📄 {file_path} — lines {start+1}–{end} of {total}")
            print("".join(selected))
        except ValueError:
            print(f"❌ Invalid line range: {line_range}. Use format: 10-50")
            return
    else:
        # Full read
        print(f"📄 {file_path} ({total} lines)")
        print("".join(all_lines))

    # Update cache
    import datetime
    cache[file_path] = {
        "hash": current_hash,
        "total_lines": total,
        "last_read": datetime.datetime.now().isoformat(),
        "summary": f"{total} lines. First line: {all_lines[0].strip()[:80] if all_lines else 'empty'}"
    }
    save_cache(cache)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Read files efficiently — skip unchanged files, read line ranges")
    parser.add_argument("--file", required=True, help="Path to the file to read")
    parser.add_argument("--lines", default=None, help="Line range to read, e.g. 10-50")
    parser.add_argument("--summary", action="store_true", help="Show only a structural summary (first/last lines)")
    args = parser.parse_args()
    smart_read(args.file, args.lines, args.summary)
