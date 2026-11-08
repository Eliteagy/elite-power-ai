# Using subscription events for the subscription lifecycle
Context: Discord developer reference: Using subscription events for the subscription lifecycle
[Source](eligibility-subscriptions-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-subscriptions.md) / [Previous source section](how-app-subscriptions-work.md) / [Following source section](working-with-entitlements.md)
<a id="source-using-subscription-events-for-the-subscription-lifecycle"></a>

### Using Subscription Events for the Subscription Lifecycle

 Entitlements do not renew or update on cancellation, so subscription events can help follow the subscription lifecycle. This list is not exhaustive. Use entitlement presence to decide whether a user has premium access. The Subscription API and related events support reporting and lifecycle management and **are not the source of truth for premium-feature access**.
| Event Name | Subscription Behavior | Updated Fields |
| --- | --- | --- |
| `SUBSCRIPTION_CREATE` | Subscription is created | `status` is `0 (active)` when an entitlement has been granted, or `1 (inactive)` when it has not been granted yet |
| `SUBSCRIPTION_UPDATE` | Subscription is granted an entitlement | `status` is `0 (active)` |
| `SUBSCRIPTION_UPDATE` | Subscription is renewed | `current_period_start`, `current_period_end` timestamps updated |
| `SUBSCRIPTION_UPDATE` | Subscription is upgraded or downgraded | `sku_ids`, `entitlement_ids`, `renewal_sku_ids` may be updated |
| `SUBSCRIPTION_UPDATE` | Subscription is canceled | `canceled_at` timestamp updated, `status` is `2 (ending)` |
| `SUBSCRIPTION_UPDATE` | Subscription ends | `status` is `1 (inactive)`; this event is asynchronous and will not occur immediately |
| `SUBSCRIPTION_UPDATE` | Subscription is resumed or uncanceled by user | `status` is `0 (active)` |

---

