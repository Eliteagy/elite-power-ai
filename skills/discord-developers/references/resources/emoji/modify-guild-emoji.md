# Modify guild emoji
Context: Discord developer reference: Modify guild emoji
[Source](../emoji-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](emoji-object.md) / [Previous source section](create-guild-emoji.md) / [Following source section](delete-guild-emoji.md)
<a id="source-modify-guild-emoji"></a> <a id="source-json-params-1"></a>

### Modify Guild Emoji

  Updates the specified emoji. If the current user created the emoji, either `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` is required. For emojis created by someone else, `MANAGE_GUILD_EXPRESSIONS` is required. A successful request returns the updated [emoji](https://docs.discord.com/developers/resources/emoji#emoji-object) object and emits a [Guild Emojis Update](https://docs.discord.com/developers/events/gateway-events#guild-emojis-update) Gateway event. Every parameter is optional. This endpoint accepts the `X-Audit-Log-Reason` header.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the emoji |
| roles | ?array of snowflakes | roles that may use this emoji. |

