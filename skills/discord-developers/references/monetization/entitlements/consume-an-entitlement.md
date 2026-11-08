# Consume an entitlement
Context: Discord developer reference: Consume an entitlement
[Source](../../resources/emoji-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](entitlement-object.md) / [Previous source section](entitlement-object-get-entitlement.md) / [Following source section](create-test-entitlement.md)
<a id="source-consume-an-entitlement"></a>

### Consume an Entitlement

 POST/applications/[{application.id}](https://docs.discord.com/developers/resources/application#application-object)/entitlements/[{entitlement.id}](https://docs.discord.com/developers/resources/entitlement#entitlement-object)/consume For One-Time Purchase consumable SKUs, marks the user's entitlement as consumed. Afterward, [List Entitlements](https://docs.discord.com/developers/resources/entitlement#list-entitlements) shows `consumed: true` for that entitlement. Success returns `204 No Content`.

