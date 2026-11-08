# Using the subscription API
Context: Discord developer reference: Using the subscription API
[Source](eligibility-subscriptions-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-subscriptions.md) / [Previous source section](downgrading-an-existing-subscription.md) / [Following source section](using-test-entitlements.md)
<a id="source-using-the-subscription-api"></a>

### Using the Subscription API

 For monetization, [Entitlements](https://docs.discord.com/developers/resources/entitlement) are the source of truth for a user's access to a SKU. The Subscription API is for reporting and lifecycle management outside direct user interaction. Use the [Subscription API](https://docs.discord.com/developers/resources/subscription) to inspect subscription status, list subscriptions by user for reports, and check subscription state without reading entitlements directly.
- [List SKU Subscriptions](https://docs.discord.com/developers/resources/subscription#list-sku-subscriptions): Lists all subscriptions tied to one SKU in the app.
- [Get SKU Subscription](https://docs.discord.com/developers/resources/subscription#get-sku-subscription): Retrieve one subscription in the app.
- [Subscription Gateway events](https://docs.discord.com/developers/events/gateway-events#subscriptions): Discord emits gateway events when subscriptions are created, updated, and, rarely, deleted.

---

