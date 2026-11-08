# One time purchases consumable and durable items
Context: Discord developer reference: One time purchases consumable and durable items
[Source](purchases-and-premium-responses-index.md) / [Owning endpoint, event, object or procedure conditions](key-concepts.md) / [Owning endpoint, event, object or procedure conditions](handling-one-time-purchase-entitlements.md) / [Following source section](key-concepts-initiating-purchases.md)
<a id="source-one-time-purchases-consumable-and-durable-items"></a>

#### One-Time Purchases: Consumable and Durable Items

 Activities often sell consumable or single-use items, such as a potion or power-up. Buying a consumable SKU creates an entitlement with `consumed: false`. Process the purchase and [consume the entitlement](https://docs.discord.com/developers/resources/entitlement#consume-an-entitlement) promptly so the user receives the item. For unlimited-duration perks, use a durable SKU rather than a consumable SKU. The [Implementing One-Time Purchases](https://docs.discord.com/developers/monetization/implementing-one-time-purchases) guide covers durable and consumable items in more detail.

---

