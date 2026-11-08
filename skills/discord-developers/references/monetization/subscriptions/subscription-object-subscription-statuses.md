# Subscription object subscription statuses
Context: Discord developer reference: Subscription object subscription statuses
[Source](../../resources/stickers-and-subscriptions-index.md) / [Owning endpoint, event, object or procedure conditions](subscription-object.md) / [Previous source section](subscription-object-subscription-example.md) / [Following source section](list-sku-subscriptions.md)
<a id="source-subscription-statuses"></a>

### Subscription Statuses

| Type | Value | Description |
| --- | --- | --- |
| ACTIVE | 0 | Subscription is active and will renew. |
| INACTIVE | 1 | Subscription is inactive and charges are not occurring. |
| ENDING | 2 | Subscription remains active but is not set to renew. |

 Do not use subscription status itself to decide perk access. Use [entitlements](https://docs.discord.com/developers/resources/entitlement#entitlement-object) to determine whether a user should access a given SKU. For more context, see [Implementing App Subscriptions](https://docs.discord.com/developers/monetization/implementing-app-subscriptions). During the current period, subscriptions can begin in or move among any of these statuses. A subscription may be `ACTIVE` outside its current period or `INACTIVE` during it. Examples include:
- During retry for a failed payment, the subscription can stay `ACTIVE` until payment succeeds or the system marks it unrecoverable.
- A refund or chargeback within the current period can make the subscription `INACTIVE`.

