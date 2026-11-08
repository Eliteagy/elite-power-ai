# Uploading files
Context: Discord developer reference: Uploading files
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](signed-attachment-cdn-urls.md) / [Following source section](editing-message-attachments.md)
<a id="source-uploading-files"></a>

### Uploading Files

 The upload limit applies per file in a request. The default is `10 MiB` for all users, with possible higher limits based on [Nitro](https://support.discord.com/hc/en-us/articles/115000435108-What-are-Nitro-Nitro-Basic) status or server [Boost Tier](https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting-FAQ-#h_419c3bd5-addd-4989-b7cf-c7957ef92583). The `attachment_size_limit` value [when working with interactions](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) is the maximum of those values. Endpoints that accept uploads mention the `files[n]` parameter. To attach files, replace the normal `application/json` body with a `multipart/form-data` body. You may include the JSON message body as `payload_json`. Every `files[n]` part needs a valid `Content-Disposition` subpart header with `filename` and a unique `name`. File names must use the form `files[n]`, for example `files[0]`, `files[1]`, or `files[42]`. The `n` suffix is the snowflake placeholder referenced by the `attachments` field, which can be included in `payload_json` or [Callback Data Payloads](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-structure). Embeds can reference uploaded images with `attachment://filename`. An example payload follows.

