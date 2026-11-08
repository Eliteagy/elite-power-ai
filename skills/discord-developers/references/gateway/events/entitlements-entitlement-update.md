# Entitlements entitlement update
Context: Discord developer reference: Entitlements entitlement update
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](entitlements-entitlement-create.md) / [Following source section](entitlements-entitlement-delete.md)
<a id="source-entitlement-update"></a>

#### Entitlement Update

 Note: `ENTITLEMENT_UPDATE` behavior changed on October 1, 2024. See the [Change Log and Entitlement Migration Guide](https://docs.discord.com/developers/change-log#premium-apps-entitlement-migration-and-new-subscription-api) for details about the change. The event is dispatched when an entitlement is updated, and its payload body is an [entitlement](https://docs.discord.com/developers/resources/entitlement#entitlement-object) object. For subscription entitlements, it fires only when a user's subscription ends and includes an `ends_at` timestamp for the entitlement end.

