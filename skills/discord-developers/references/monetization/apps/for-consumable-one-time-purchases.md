# For consumable one time purchases
Context: Discord developer reference: For consumable one time purchases
[Source](purchases-and-premium-responses-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-one-time-purchases.md) / [Previous source section](for-durable-one-time-purchases.md) / [Following source section](responding-with-a-premium-button.md)
<a id="source-for-consumable-one-time-purchases"></a>

### For Consumable One-Time Purchases

 For consumables, a user may hold only one entitlement that has not been consumed. Process and store the item in the app or game, then call [Consume Entitlement](https://docs.discord.com/developers/resources/entitlement#consume-an-entitlement) so the user can buy that item later. After consumption, the entitlement's `consumed` field returns true. Decide how the app records consumable item state and quantity before choosing when to consume entitlements.

---

