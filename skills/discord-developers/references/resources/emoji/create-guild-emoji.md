# Create guild emoji
Context: Discord developer reference: Create guild emoji
[Source](../emoji-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](emoji-object.md) / [Previous source section](get-guild-emoji.md) / [Following source section](modify-guild-emoji.md)
<a id="source-create-guild-emoji"></a> <a id="source-json-params"></a>

### Create Guild Emoji

  Creates a guild emoji. This requires `CREATE_GUILD_EXPRESSIONS` and returns the created [emoji](https://docs.discord.com/developers/resources/emoji#emoji-object) object when successful. It also emits a [Guild Emojis Update](https://docs.discord.com/developers/events/gateway-events#guild-emojis-update) Gateway event. Emoji and animated emoji uploads are limited to 256 KiB. Larger uploads fail with 400 Bad Request and an error message, but without a [JSON status code](https://docs.discord.com/developers/topics/opcodes-and-status-codes#json). Discord strongly recommends fetching emoji with `.webp` for performance and compatibility; see [Emoji Formats](https://docs.discord.com/developers/resources/emoji#emoji-object-emoji-formats). This endpoint accepts the `X-Audit-Log-Reason` header.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the emoji |
| image | image data | the 128x128 emoji image |
| roles | array of snowflakes | roles that may use this emoji. |

