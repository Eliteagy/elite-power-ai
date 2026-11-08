# Start thread in forum or media channel
Context: Discord developer reference: Start thread in forum or media channel
[Source](invites-permissions-and-threads-index.md) / [Previous source section](start-thread-without-message.md) / [Following source section](join-thread.md)
<a id="source-start-thread-in-forum-or-media-channel"></a> <a id="source-jsonform-params-1"></a> <a id="source-forum-and-media-thread-message-params-object"></a>

### Start Thread in Forum or Media Channel

  Create a thread in a forum or media channel and send its first message. Success returns a [channel](https://docs.discord.com/developers/resources/channel#channel-object) with a nested [message](https://docs.discord.com/developers/resources/message#message-object) object; invalid parameters return 400 BAD REQUEST. Discord fires [Thread Create](https://docs.discord.com/developers/events/gateway-events#thread-create) and [Message Create](https://docs.discord.com/developers/events/gateway-events#message-create) Gateway events.
- The created thread uses type `PUBLIC_THREAD`.
- For correct message layout, see [message formatting](https://docs.discord.com/developers/reference#message-formatting).
- The current user needs `SEND_MESSAGES`; `CREATE_PUBLIC_THREADS` is ignored.
- Message-send requests can be at most **25 MiB**.
- For embeds, every field can be set except `type` (always `rich` even if another value is attempted), `provider`, `video`, and image `height`, `width`, or `proxy_url` values.
- File upload examples are in [Uploading Files](https://docs.discord.com/developers/reference#uploading-files).
- Attach files with a `multipart/form-data` body as documented in [Uploading Files](https://docs.discord.com/developers/reference#uploading-files).
- A message send must include **at least one of** `content`, `embeds`, `sticker_ids`, `components`, or `files[n]`.
 Discord may remove characters from message content, including invalid unicode or characters that would create unexpected formatting. When inserting user-generated strings into message content, sanitize them to avoid unexpected behavior and use `allowed_mentions` to prevent unwanted mentions. `X-Audit-Log-Reason` is supported.

###### JSON/Form Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | 1-100 character channel name |
| auto_archive_duration?* | integer | Minutes after recent activity before the thread automatically archives; allowed values are 60, 1440, 4320, and 10080. |
| rate_limit_per_user? | ?integer | Seconds a user must wait before posting another message (0-21600). |
| message | a forum thread message params object | First message contents for the forum or media thread. |
| applied_tags? | array of snowflakes | IDs for the tag set applied to a thread in a `GUILD_FORUM` or `GUILD_MEDIA` channel. |
| files[n]?* | file contents | Contents of the file being uploaded. See Uploading Files. |
| payload_json? | string | JSON-encoded non-file parameter body, used only with `multipart/form-data` requests. See Uploading Files. |

###### Forum and Media Thread Message Params Object

 When sending a message, apps need a value for **at least one of** `content`, `embeds`, `sticker_ids`, `components`, or `files[n]`.
| Field | Type | Description |
| --- | --- | --- |
| content?* | string | Message contents (up to 2000 characters) |
| embeds?* | array of embed objects | Up to 10 `rich` embeds, with up to 6000 characters. |
| allowed_mentions? | allowed mention object | Allowed mentions for the message |
| components?* | array of message component objects | Message components to include. |
| sticker_ids?* | array of snowflakes | IDs for up to 3 server stickers to send with the message. |
| attachments? | array of partial attachment objects | Attachment objects containing `filename` and `description`. See Uploading Files. |
| flags? | integer | Message flags combined as a bitfield; only `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATIONS` may be set. |

 * One of `content`, `embeds`, `sticker_ids`, `components`, or `files[n]` is required at minimum.

