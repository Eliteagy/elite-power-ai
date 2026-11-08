# Execute webhook
Context: Discord developer reference: Execute webhook
[Source](webhook-index.md) / [Previous source section](delete-webhook-with-token.md) / [Following source section](execute-slack-compatible-webhook.md)
<a id="source-execute-webhook"></a> <a id="source-query-string-params"></a> <a id="source-jsonform-params"></a>

### Execute Webhook

  See [Uploading Files](https://docs.discord.com/developers/reference#uploading-files) for attachment handling and `multipart/form-data` requests. Depending on `wait`, the response is either a message or `204 No Content`. A send request must include at **least one of** `content`, `embeds`, `components`, `file`, or `poll`. For forum or media channels, provide `thread_id` in query string params or `thread_name` in JSON/form params. `thread_id` sends the message into that thread. `thread_name` creates a thread with that name in the channel. Discord may remove invalid unicode characters or characters that unexpectedly affect formatting from message content. Sanitize user-generated message content when needed, and use `allowed_mentions` to avoid unintended mentions.

###### Query String Params

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| wait | boolean | waits for Discord to confirm message creation before responding, and returns the created message body; defaults to `false`; when `false`, an unsaved message does not return an error | false |
| thread_id | snowflake | Send the message to a specific thread inside the webhook's channel; Discord automatically unarchives that thread | false |
| with_components | boolean | whether Discord should honor the request `components` field. When enabled, application-owned webhooks may use all components, and non-owned webhooks may use non-interactive components. Defaults to `false` | false |

###### JSON/Form Params

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| content | string | message content, up to 2000 characters | one of content, file, embeds, poll |
| username | string | default webhook username override | false |
| avatar_url | string | default webhook avatar override | false |
| tts | boolean | true when the message is TTS | false |
| embeds | array of up to 10 embed objects | embedded `rich` content | one of content, file, embeds, poll |
| allowed_mentions | allowed mention object | allowed mentions for the message | false |
| components * | array of message component | components included in the message | false |
| files[n] ** | file contents | file contents being sent | one of content, file, embeds, poll |
| payload_json ** | string | JSON-encoded body for non-file parameters | `multipart/form-data` only |
| attachments ** | array of partial attachment objects | attachment objects with filenames and descriptions | false |
| flags *** | integer | message flags as a combined bitfield; only `SUPPRESS_EMBEDS`, `SUPPRESS_NOTIFICATIONS`, and `IS_COMPONENTS_V2` are allowed | false |
| thread_name | string | thread name to create; requires a webhook channel that is a forum or media channel | false |
| applied_tags | array of snowflakes | array of tag ids to attach to the thread; requires a webhook channel that is a forum or media channel | false |
| poll | poll request object | A poll! | one of content, file, embeds, poll |

 * Application-owned webhooks may always send components. Non-application-owned webhooks cannot send interactive components, and Discord ignores `components` unless `with_components` is set. ** See [Uploading Files](https://docs.discord.com/developers/reference#uploading-files) for details. *** With `IS_COMPONENTS_V2`, a webhook message may contain only `components`; including `content`, `embeds`, `files[n]`, or `poll` causes a 400 BAD REQUEST. For webhook embed objects, all fields are allowed except `type` (always `rich` even if supplied), `provider`, `video`, and image `height`, `width`, or `proxy_url` values.

