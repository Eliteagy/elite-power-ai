# Delete guild emoji
Context: Discord developer reference: Delete guild emoji
[Source](../emoji-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](emoji-object.md) / [Previous source section](modify-guild-emoji.md) / [Following source section](list-application-emojis.md)
<a id="source-delete-guild-emoji"></a>

### Delete Guild Emoji

  Deletes the specified emoji. For emojis created by the current user, either `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` is required; other emojis require `MANAGE_GUILD_EXPRESSIONS`. Success returns `204 No Content` and emits a [Guild Emojis Update](https://docs.discord.com/developers/events/gateway-events#guild-emojis-update) Gateway event. This endpoint accepts the `X-Audit-Log-Reason` header.

