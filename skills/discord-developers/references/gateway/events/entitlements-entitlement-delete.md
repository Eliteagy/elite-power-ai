# Entitlements entitlement delete
Context: Discord developer reference: Entitlements entitlement delete
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](entitlements-entitlement-create.md) / [Previous source section](entitlements-entitlement-update.md) / [Following source section](guilds-guild-create.md)
<a id="source-entitlement-delete"></a>

#### Entitlement Delete

 Dispatched when an entitlement is deleted. The payload body is an [entitlement](https://docs.discord.com/developers/resources/entitlement#entitlement-object) object. Entitlement deletion is uncommon and happens when:
- Discord refunds a subscription
- Discord uses internal tooling to remove a user's entitlement
- Discord deletes an API-created app-managed entitlement
 Expiration does *not* delete entitlements.

