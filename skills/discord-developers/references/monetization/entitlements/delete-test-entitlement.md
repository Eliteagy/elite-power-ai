# Delete test entitlement
Context: Discord developer reference: Delete test entitlement
[Source](../../resources/emoji-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](entitlement-object.md) / [Previous source section](create-test-entitlement.md)
<a id="source-delete-test-entitlement"></a>

### Delete Test Entitlement

 DELETE/applications/[{application.id}](https://docs.discord.com/developers/resources/application#application-object)/entitlements/[{entitlement.id}](https://docs.discord.com/developers/resources/entitlement#entitlement-object) Deletes an active test entitlement. Discord then treats that user or guild as *no longer having* entitlement to the premium offering. Success returns `204 No Content`.
