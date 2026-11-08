# For consumable skus
Context: Discord developer reference: For consumable skus
[Source](purchases-and-premium-responses-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-one-time-purchases.md) / [Owning endpoint, event, object or procedure conditions](for-durable-skus.md) / [Following source section](working-with-entitlements.md)
<a id="source-for-consumable-skus"></a>

#### For Consumable SKUs

- When a consumable SKU is purchased, Discord creates an [Entitlement](https://docs.discord.com/developers/resources/entitlement) for the purchaser and that SKU.
- Discord sends an `ENTITLEMENT_CREATE` event through the Gateway.
- The entitlement becomes available through the `LIST Entitlements` API endpoint.
- For guild subscriptions, `Interaction Payloads` from entitled guild users include the entitlement; user subscriptions include it for the entitled user.
- The SKU cannot be bought again until the entitlement is consumed through the [Consume Entitlement API](https://docs.discord.com/developers/resources/entitlement#consume-an-entitlement) endpoint.
  - In [Test Mode](https://docs.discord.com/developers/monetization/implementing-one-time-purchases#using-application-test-mode), developers may repeat purchases without consuming the entitlement.

- After receiving `ENTITLEMENT_CREATE` for a consumable SKU, process the item in the app and consume the entitlement promptly.

---

