# Cancelling an existing subscription
Context: Discord developer reference: Cancelling an existing subscription
[Source](eligibility-subscriptions-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-subscriptions.md) / [Previous source section](starting-a-new-subscription.md) / [Following source section](resuming-a-cancelled-subscription.md)
<a id="source-cancelling-an-existing-subscription"></a>

### Cancelling an existing subscription

 Users may cancel from Subscription settings at any time. On cancellation, these events are sent:
| Event | Event Trigger |
| --- | --- |
| `SUBSCRIPTION_UPDATE` | when the subscription moves toward ending with `status` `2 (ending)` and `canceled_at` is set to the user's cancellation timestamp |

 The subscription and entitlement remain valid until `current_period_end`. If the user does not resume before `current_period_end`, the subscription ends and these events arrive:
| Event | Event Trigger |
| --- | --- |
| `ENTITLEMENT_UPDATE` | when the current entitlement ends and `ends_at` is updated with a timestamp |
| `SUBSCRIPTION_UPDATE` | when the subscription is updated to `status` `1 (inactive)` |

