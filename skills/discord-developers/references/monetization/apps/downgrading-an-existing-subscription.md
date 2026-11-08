# Downgrading an existing subscription
Context: Discord developer reference: Downgrading an existing subscription
[Source](eligibility-subscriptions-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-subscriptions.md) / [Previous source section](upgrading-an-existing-subscription.md) / [Following source section](using-the-subscription-api.md)
<a id="source-downgrading-an-existing-subscription"></a>

### Downgrading an existing subscription

 When a user downgrades from a higher tier to a lower tier, Discord does not charge immediately because the new price is lower than what has already been paid. The current plan remains valid until `subscription.current_period_end`, and this event is sent:
| Event | Event Trigger |
| --- | --- |
| `SUBSCRIPTION_UPDATE` | when the subscription is updated to show the renewal SKU ID in `subscription.renewal_sku_ids` |

 When the current subscription reaches `subscription.current_period_end`, these events are sent:
| Event | Event Trigger |
| --- | --- |
| `ENTITLEMENT_UPDATE` | when the current entitlement ends and `ends_at` is updated with a timestamp |
| `ENTITLEMENT_CREATE` | when Discord creates a new entitlement for the downgraded subscription SKU |
| `SUBSCRIPTION_UPDATE` | when the subscription is updated with new `entitlement_ids`, `sku_ids`, `current_period_start`, and `current_period_end` |

---

