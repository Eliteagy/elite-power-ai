# Starting a new subscription
Context: Discord developer reference: Starting a new subscription
[Source](eligibility-subscriptions-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-subscriptions.md) / [Previous source section](types-of-subscriptions-supporting-subscriptions.md) / [Following source section](cancelling-an-existing-subscription.md)
<a id="source-starting-a-new-subscription"></a>

### Starting a new subscription

 When a user starts a new subscription, expect these events:
| Event | Event Trigger |
| --- | --- |
| `SUBSCRIPTION_CREATE` | when the subscription is first created; `status` is `0 (active)` when the entitlement has been granted, or `1 (inactive)` before entitlement grant |
| `ENTITLEMENT_CREATE` | when the user receives an entitlement for the new subscription |
| `SUBSCRIPTION_UPDATE` | when the subscription is updated with `entitlement_ids`, `renewal_sku_ids`, and `status` (`0 (active)`) |

