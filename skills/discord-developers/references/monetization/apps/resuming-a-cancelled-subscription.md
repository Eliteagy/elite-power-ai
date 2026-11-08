# Resuming a cancelled subscription
Context: Discord developer reference: Resuming a cancelled subscription
[Source](eligibility-subscriptions-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-subscriptions.md) / [Previous source section](cancelling-an-existing-subscription.md) / [Following source section](supporting-upgrades-and-downgrades.md)
<a id="source-resuming-a-cancelled-subscription"></a>

### Resuming a cancelled subscription

 Before `current_period_end`, users can resume the subscription from Subscription settings. When they resume, these events are sent:
| Event | Event Trigger |
| --- | --- |
| `SUBSCRIPTION_UPDATE` | when the subscription continues again with `status` `0 (active)` and `canceled_at` is reset to null |

---

