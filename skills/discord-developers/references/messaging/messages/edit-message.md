# Edit message
Context: Discord developer reference: Edit message
[Source](reactions-edits-and-pins-index.md) / [Previous source section](delete-all-reactions-for-emoji.md) / [Following source section](delete-message.md)
<a id="source-edit-message"></a> <a id="source-jsonform-params"></a>

### Edit Message

  Updates a message that was previously sent. The message author may edit `content`, `embeds`, `flags`, and `components`. Other users may edit only `flags`, and only with `MANAGE_MESSAGES` in the relevant channel. When sending `flags`, include all existing flag bits along with the bits being changed. Users may modify only the `flags` listed below; unsupported flag edits are currently ignored without an error. Editing `content` rebuilds the message object's `mentions`, `mention_roles`, and `mention_everyone` values from the new content. If `IS_COMPONENTS_V2` is set, those reconstructed values come from edited content in the `components` array. The edit request's `allowed_mentions` controls that parsing. Without an explicit `allowed_mentions` in the edit request, Discord parses content with *default* allowances, regardless of whether the original create request included `allowed_mentions`. A successful call returns a [message](https://docs.discord.com/developers/resources/message#message-object) object and emits a [Message Update](https://docs.discord.com/developers/events/gateway-events#message-update) Gateway event. See [Uploading Files](https://docs.discord.com/developers/reference#uploading-files) for attachment and `multipart/form-data` details. Files supplied in the edit are **appended**. To remove or replace files, provide the `attachments` field listing the files that should remain on the message after the edit. Starting with API v10, the `attachments` array must list every attachment that should exist after editing, including **retained and new** attachments sent in the request body. All parameters for this endpoint are optional and nullable.

###### JSON/Form Params

| Field | Type | Description |
| --- | --- | --- |
| content | string | Message contents (up to 2000 characters) |
| embeds | array of embed objects | Up to 10 `rich` embeds, with up to 6000 characters |
| flags* | integer | Change message flags (`SUPPRESS_EMBEDS` and `IS_COMPONENTS_V2` only) |
| allowed_mentions | allowed mention object | Allowed mentions for the message |
| components | array of message component | Components that should be included with the message |
| files[n] | file contents | File contents being sent or edited. See Uploading Files |
| payload_json | string | JSON-encoded non-file parameters for `multipart/form-data` requests only. See Uploading Files |
| attachments | array of attachment objects | Existing attachments to retain plus possible descriptions for new files. See Uploading Files |

 * `SUPPRESS_EMBEDS` may be set or unset, but `IS_COMPONENTS_V2` may only be set. When setting `IS_COMPONENTS_V2`, any used `content`, `embeds`, `sticker_ids`, or `poll` values must be cleared. Use `null` for `content` and `poll`; use `[]` for `embeds` and `sticker_ids`. Otherwise the request fails with 400 BAD REQUEST.

