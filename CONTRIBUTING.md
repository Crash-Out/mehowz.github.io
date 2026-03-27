# Contributing

This site is powered by a single JSON file: `public/posts.json`. To add a missing toxic post from mehowz, submit a PR that adds an entry to that file.

## How to add a post

1. Find the message in the [@zenonnetwork](https://t.me/zenonnetwork) Telegram channel
2. Note the message ID from the URL (the number after `https://t.me/zenonnetwork/`)
3. Add a new entry to the `posts` array in `public/posts.json`
4. Submit a PR

### Post schema

```json
{
  "id": 412068,
  "date": "2025-11-21T16:27:01Z",
  "content": "The full message text",
  "edit_date": null,
  "keywords_matched": ["useless"],
  "telegram_url": "https://t.me/zenonnetwork/412068",
  "reply_to": {
    "id": 412066,
    "content": "The message mehowz was replying to",
    "user_name": "their_username",
    "first_name": "Their Display Name",
    "telegram_url": "https://t.me/zenonnetwork/412066"
  }
}
```

### Required fields

| Field | Description |
|-------|-------------|
| `id` | Telegram message ID (must be unique) |
| `date` | ISO 8601 timestamp |
| `content` | Full message text |
| `keywords_matched` | Array of toxic keywords found in the message |
| `telegram_url` | `https://t.me/zenonnetwork/{id}` |

### Optional fields

| Field | Description |
|-------|-------------|
| `edit_date` | ISO 8601 timestamp if the message was edited, otherwise `null` |
| `reply_to` | Object with the message mehowz was replying to, or `null` |

### Guidelines

- Only add messages from mehowz (mehowbrainz) in the @zenonnetwork channel
- The `telegram_url` must match the format `https://t.me/zenonnetwork/{id}`
- Include `reply_to` context when available - it helps readers understand the conversation
- Keep `keywords_matched` accurate - only list keywords actually present in the content
