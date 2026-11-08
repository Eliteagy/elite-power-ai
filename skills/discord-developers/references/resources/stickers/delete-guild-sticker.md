# Delete guild sticker
Context: Discord developer reference: Delete guild sticker
[Source](../stickers-and-subscriptions-index.md) / [Owning endpoint, event, object or procedure conditions](sticker-object.md) / [Previous source section](modify-guild-sticker.md) / [Following source section](../../monetization/subscriptions/subscription-object.md)
<a id="source-delete-guild-sticker"></a>

### Delete Guild Sticker

  Deletes the specified sticker. If the current user created it, either `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` is required. For stickers created by another user, `MANAGE_GUILD_EXPRESSIONS` is required. Success returns `204 No Content` and emits a [Guild Stickers Update](https://docs.discord.com/developers/events/gateway-events#guild-stickers-update) Gateway event. The endpoint accepts the `X-Audit-Log-Reason` header.

