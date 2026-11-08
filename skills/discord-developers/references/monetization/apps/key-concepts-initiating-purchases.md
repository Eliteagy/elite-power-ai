# Key concepts initiating purchases
Context: Discord developer reference: Key concepts initiating purchases
[Source](purchases-and-premium-responses-index.md) / [Owning endpoint, event, object or procedure conditions](key-concepts.md) / [Previous source section](one-time-purchases-consumable-and-durable-items.md) / [Following source section](subscribing-to-purchase-events-with-the-embedded-app-sdk.md)
<a id="source-initiating-purchases"></a>

### Initiating Purchases

 After SKUs are displayed in the custom storefront, start a purchase when the user chooses one. In an Activity, call [`startPurchase()`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#startpurchase) from the Embedded App SDK with the selected SKU `id`. Discord opens a purchase modal for that SKU. See the [Embedded App SDK Reference](https://docs.discord.com/developers/developer-tools/embedded-app-sdk) for details on [`startPurchase()`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#startpurchase). To learn when checkout finished, subscribe to `ENTITLEMENT_CREATE` events.

