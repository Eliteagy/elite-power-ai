# Upgrading an existing subscription
Context: Discord developer reference: Upgrading an existing subscription
[Source](eligibility-subscriptions-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-subscriptions.md) / [Previous source section](supporting-upgrades-and-downgrades.md) / [Following source section](downgrading-an-existing-subscription.md)
<a id="source-upgrading-an-existing-subscription"></a>

### Upgrading an existing subscription

 When a user upgrades from a lower tier to a tier with the same or higher price, Discord charges the price difference and resets the subscription period at upgrade time. The lower-tier entitlement ends immediately, producing these events:
| Event | Event Trigger |
| --- | --- |
| `ENTITLEMENT_UPDATE` | when the current entitlement ends and `ends_at` is updated with a timestamp |
| `ENTITLEMENT_CREATE` | when Discord creates a new entitlement for the upgrade subscription SKU |
| `SUBSCRIPTION_UPDATE` | when the subscription is updated with new `entitlement_ids`, `sku_ids`, `current_period_start`, and `current_period_end` |

