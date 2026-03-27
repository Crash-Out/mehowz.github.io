#!/usr/bin/env python3
"""Extract all posts from mehowz in the Zenon Network Telegram channel, grouped into threads."""

import sqlite3
import json
import re
from datetime import datetime

DB_PATH = "data.sqlite"
OUTPUT_PATH = "public/posts.json"
USER_ID = 433599934
CHANNEL = "zenonnetwork"

KEYWORDS = [
    "idiot", "retarded", "dumb", "pathetic", "useless", "suck", "sucking",
    "kill", "fool", "clown", "garbage", "crap", "psyops", "scam", "grift",
    "sham", "doxx", "doxxed", "doxxing"
]

def build_keyword_pattern():
    escaped = [re.escape(k) for k in KEYWORDS]
    return re.compile(r'\b(' + '|'.join(escaped) + r')\b', re.IGNORECASE)

def find_matched_keywords(content, pattern):
    matches = pattern.findall(content)
    return list(set(m.lower() for m in matches))

def fetch_reply(cursor, reply_to_id, channel):
    if not reply_to_id:
        return None
    cursor.execute("""
        SELECT m.id, m.content, u.username, u.first_name
        FROM messages m
        LEFT JOIN users u ON m.user_id = u.id
        WHERE m.id = ?
    """, (reply_to_id,))
    row = cursor.fetchone()
    if not row:
        return None
    return {
        "id": row["id"],
        "content": row["content"] or "",
        "user_name": row["username"] or "",
        "first_name": row["first_name"] or "",
        "telegram_url": f"https://t.me/{channel}/{row['id']}",
    }

def main():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # Get ALL mehowz messages with info about whether previous message was also from mehowz
    cursor.execute("""
        SELECT m.id, m.type, m.date, m.edit_date, m.content, m.reply_to,
               (SELECT m2.user_id FROM messages m2 WHERE m2.id < m.id ORDER BY m2.id DESC LIMIT 1) as prev_user_id
        FROM messages m
        WHERE m.user_id = ?
        AND m.content IS NOT NULL
        AND m.content != ''
        ORDER BY m.id ASC
    """, (USER_ID,))

    pattern = build_keyword_pattern()
    groups = []
    current_group = None

    for row in cursor.fetchall():
        content = row["content"]
        matched = find_matched_keywords(content, pattern)
        is_consecutive = (row["prev_user_id"] == USER_ID)

        message = {
            "id": row["id"],
            "date": row["date"].replace(" ", "T") + "Z" if row["date"] else None,
            "content": content,
            "edit_date": (row["edit_date"].replace(" ", "T") + "Z") if row["edit_date"] else None,
            "keywords_matched": sorted(matched) if matched else [],
            "flagged": len(matched) > 0,
            "telegram_url": f"https://t.me/{CHANNEL}/{row['id']}",
            "reply_to": fetch_reply(conn.cursor(), row["reply_to"], CHANNEL),
        }

        if is_consecutive and current_group is not None:
            # Append to current group
            current_group["messages"].append(message)
            if message["flagged"]:
                current_group["flagged"] = True
                # Merge keywords
                all_kw = set(current_group["keywords_matched"]) | set(matched)
                current_group["keywords_matched"] = sorted(all_kw)
        else:
            # Start a new group
            if current_group is not None:
                groups.append(current_group)
            current_group = {
                "id": row["id"],
                "date": message["date"],
                "telegram_url": message["telegram_url"],
                "flagged": message["flagged"],
                "keywords_matched": message["keywords_matched"][:],
                "messages": [message],
            }

    if current_group is not None:
        groups.append(current_group)

    flagged_count = sum(1 for g in groups if g["flagged"])
    total_messages = sum(len(g["messages"]) for g in groups)

    data = {
        "meta": {
            "channel": CHANNEL,
            "user": {
                "id": USER_ID,
                "username": "mehowbrainz",
                "display_name": "mehowz | ZenonOrg",
            },
            "extracted_at": datetime.now().strftime("%Y-%m-%d"),
            "total_messages": total_messages,
            "total_groups": len(groups),
            "flagged_groups": flagged_count,
            "keywords": KEYWORDS,
        },
        "posts": groups,
    }

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Extracted {total_messages} messages in {len(groups)} groups ({flagged_count} flagged) to {OUTPUT_PATH}")

    conn.close()

if __name__ == "__main__":
    main()
