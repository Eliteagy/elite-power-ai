# Per-Attachment File Upload Behavior for Apps

Date: 2025-04-03
Categories: HTTP API, Interactions
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2315) · [Year index](INDEX.md)

<a id="source-per-attachment-file-upload-behavior-for-apps"></a>

Starting today, app file upload limits are evaluated per attachment instead of per message. App uploads now match the behavior users get when they attach multiple files to one message.
- File size limits are now checked separately for each attachment
- Earlier behavior used the combined size of all attachments on a message
- App attachment handling now matches user attachment handling
Interaction payloads now include `attachment_size_limit`, which gives the maximum attachment size allowed. The value may rise above the default when the server's Boost tier or the invoking user's Nitro entitlement permits larger uploads. See [our documentation on file uploads](https://docs.discord.com/developers/reference#uploading-files). March 17, 2025 Discord Social SDK
