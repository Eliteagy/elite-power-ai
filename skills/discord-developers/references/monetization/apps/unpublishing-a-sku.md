# Unpublishing a SKU
Context: Discord developer reference: Unpublishing a SKU
[Source](sku-management-and-pricing-index.md) / [Owning endpoint, event, object or procedure conditions](creating-a-sku.md) / [Previous source section](publishing-to-api-only.md) / [Following source section](deleting-a-sku.md)
<a id="source-unpublishing-a-sku"></a>

### Unpublishing a SKU

 **Danger:** Unpublishing a SKU can affect existing subscriptions and entitlements. It removes the SKU from both the Store and the API, so users cannot buy it. Effects of unpublishing include:
- Subscription SKUs stop renewing for subscribed users and guilds when their billing period ends.
- Users and guilds keep their SKU entitlement until the billing period finishes.
- Consumable and durable SKU entitlements remain for users who bought the SKU before it was unpublished.
- Does not delete a SKU.

