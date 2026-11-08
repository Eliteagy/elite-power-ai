# Create message
Context: Discord developer reference: Create message
[Source](attachments-and-message-creation-index.md) / [Continued source contract](create-message-json-form-params.md) / [Previous source section](get-channel-message.md)
<a id="source-create-message"></a> <a id="source-limitations"></a> <a id="source-jsonform-params"></a>

### Create Message

  Discord may remove characters from message content, including invalid unicode or characters that trigger unexpected formatting. Sanitize user-generated strings before placing them in content, and use `allowed_mentions` to prevent unwanted mentions. This endpoint posts a message to a guild text or DM channel, returns a [message](https://docs.discord.com/developers/resources/message#message-object) object, and fires a [Message Create](https://docs.discord.com/developers/events/gateway-events#message-create) Gateway event. See [message formatting](https://docs.discord.com/developers/reference#message-formatting) for formatting rules. To create a reply or forwarded message, include [`message_reference`](https://docs.discord.com/developers/resources/message#message-reference-structure) with the required fields. Attach files with a `multipart/form-data` body as described in [Uploading Files](https://docs.discord.com/developers/reference#uploading-files).

###### Limitations

- In guild channels, the current user needs `SEND_MESSAGES`.
- Sending a message with `tts` (text-to-speech) set to `true` requires `SEND_TTS_MESSAGES`.
- Replies require the current user to have `READ_MESSAGE_HISTORY`.
  - The referenced message must exist and must not be a system message.

- Message send requests can be at most **25 MiB**.
- For the embed object, every field can be set except `type` (it remains `rich` even if another value is attempted), `provider`, `video`, and image `height`, `width`, or `proxy_url` values.

###### JSON/Form Params

| Field | Type | Description |
| --- | --- | --- |
| content?* | string | Message contents (up to 2000 characters) |
| nonce? | integer or string | Verifies that a message was sent, up to 25 characters; appears in the Message Create event. |
| tts? | boolean | `true` for a TTS message |
| embeds?* | array of embed objects | Up to 10 `rich` embeds, up to 6000 characters |
| allowed_mentions? | allowed mention object | Allowed mentions for the message |
| message_reference?* | message reference | Use to make the message a reply or forward |
| components?* | array of message component objects | message components to include |
| sticker_ids?* | array of snowflakes | IDs for up to 3 server stickers to send |
| files[n]?* | file contents | file contents to send; see Uploading Files |
| payload_json? | string | JSON-encoded non-file request body, only for `multipart/form-data`; see Uploading Files |
| attachments? | array of partial attachment objects | attachment objects with filenames and descriptions; see Uploading Files |
| flags?** | integer | message flags packed into a bitfield; only `SUPPRESS_EMBEDS`, `SUPPRESS_NOTIFICATIONS`, `IS_VOICE_MESSAGE`, and `IS_COMPONENTS_V2` can be set |
| enforce_nonce? | boolean | When true and nonce is present, Discord checks whether the same author used that nonce in the past few minutes. If a matching message exists, Discord returns it and does not create another message. |
| poll? | poll request object | A poll! |
| shared_client_theme? | shared client theme object | custom client-side theme shared through the message |
