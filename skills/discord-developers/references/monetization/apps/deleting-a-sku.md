# Deleting a SKU
Context: Discord developer reference: Deleting a SKU
[Source](sku-management-and-pricing-index.md) / [Owning endpoint, event, object or procedure conditions](creating-a-sku.md) / [Previous source section](unpublishing-a-sku.md) / [Following source section](editing-a-published-sku.md)
<a id="source-deleting-a-sku"></a>

### Deleting a SKU

 **Danger:** Deleting a SKU can affect existing subscriptions and entitlements. Deletion removes the SKU from the UI and prevents publishing, but deleted SKUs still appear in API responses from [List SKUs](https://docs.discord.com/developers/resources/sku#list-skus). Deletion has these effects:
- Subscription SKU purchasers, whether users or guilds, are unsubscribed immediately. Their entitlement remains valid through the billing period end.
- Consumable and durable SKU entitlements remain for users who bought the SKU before it was unpublished.

---

