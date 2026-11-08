# For durable skus
Context: Discord developer reference: For durable skus
[Source](purchases-and-premium-responses-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-one-time-purchases.md) / [Previous source section](types-of-one-time-purchases.md) / [Following source section](for-consumable-skus.md)
<a id="source-how-one-time-purchases-work"></a> <a id="source-for-durable-skus"></a>

### How One-Time Purchases Work

#### For Durable SKUs

- When a durable SKU is purchased, Discord creates an [Entitlement](https://docs.discord.com/developers/resources/entitlement) for that purchaser and that [SKU](https://docs.discord.com/developers/resources/sku).
- Discord sends an `ENTITLEMENT_CREATE` event through the Gateway.
- The entitlement becomes available through the `LIST Entitlements` API endpoint.
- `Interaction Payloads` from the entitled user include that entitlement.

