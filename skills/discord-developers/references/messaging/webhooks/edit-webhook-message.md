# Edit webhook message
Context: Discord developer reference: Edit webhook message
[Source](webhook-index.md) / [Previous source section](get-webhook-message.md) / [Following source section](delete-webhook-message.md)
<a id="source-edit-webhook-message"></a> <a id="source-query-string-params-4"></a> <a id="source-jsonform-params-1"></a>

### Edit Webhook Message

  Edits a webhook message previously sent with the same token and returns a [message](https://docs.discord.com/developers/resources/message#message-object) object on success. Editing `content` rebuilds `mentions`, `mention_roles`, and `mention_everyone` from the new content. If `IS_COMPONENTS_V2` is set, those fields are rebuilt from edited `components` content. The edit request `allowed_mentions` field controls parsing. Without explicit `allowed_mentions`, Discord parses content using default allowances, regardless of whether the original create request included `allowed_mentions`. See [Uploading Files](https://docs.discord.com/developers/reference#uploading-files) for attachment and `multipart/form-data` details. New files are **appended** to the message. To remove or replace files, send `attachments` with the files that should remain. Starting in API v10, `attachments` must list every attachment that should exist after the edit, including retained attachments and new files in the request body. All endpoint parameters are optional and nullable.

###### Query String Params

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| thread_id | snowflake | id of the thread containing the message | false |
| with_components | boolean | whether Discord should honor the request `components` field. When enabled, application-owned webhooks may use all components, and non-owned webhooks may use non-interactive components. Defaults to `false` | false |

###### JSON/Form Params

| Field | Type | Description |
| --- | --- | --- |
| content | string | message content, up to 2000 characters |
| embeds | array of up to 10 embed objects | embedded `rich` content |
| flags * | integer | message flags as a combined bitfield; only `SUPPRESS_EMBEDS` and `IS_COMPONENTS_V2` are allowed |
| allowed_mentions | allowed mention object | allowed mentions for the message |
| components ** | array of message component | components included in the message |
| files[n] *** | file contents | file contents being sent or edited |
| payload_json *** | string | JSON-encoded body for non-file parameters, only with multipart/form-data |
| attachments *** | array of partial attachment objects | attached files to retain, plus possible descriptions for new files |
| poll **** | poll request object | A poll! |

 * `SUPPRESS_EMBEDS` may be set or unset, while `IS_COMPONENTS_V2` may only be set. With `IS_COMPONENTS_V2`, any used `content`, `embeds`, `files[n]`, or `poll` values in the original message must first be set to `null`; otherwise Discord returns 400 BAD REQUEST. ** Application-owned webhooks may always send components. Non-application-owned webhooks cannot send interactive components, and Discord ignores `components` unless `with_components` is set. *** See [Uploading Files](https://docs.discord.com/developers/reference#uploading-files). **** Polls can be added only while editing a deferred interaction response.

