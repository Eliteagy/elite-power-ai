# Modify guild sticker
Context: Discord developer reference: Modify guild sticker
[Source](../stickers-and-subscriptions-index.md) / [Owning endpoint, event, object or procedure conditions](sticker-object.md) / [Previous source section](create-guild-sticker.md) / [Following source section](delete-guild-sticker.md)
<a id="source-modify-guild-sticker"></a> <a id="source-json-params"></a>

### Modify Guild Sticker

  Updates the specified sticker. If the current user created the sticker, either `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` is required. For stickers created by someone else, `MANAGE_GUILD_EXPRESSIONS` is required. A successful call returns the updated [sticker](https://docs.discord.com/developers/resources/sticker#sticker-object) object and emits a [Guild Stickers Update](https://docs.discord.com/developers/events/gateway-events#guild-stickers-update) Gateway event. Every parameter is optional. The endpoint accepts the `X-Audit-Log-Reason` header.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the sticker (2-30 characters) |
| description | ?string | description of the sticker (2-100 characters) |
| tags | string | sticker autocomplete/suggestion tags (max 200 characters) |

