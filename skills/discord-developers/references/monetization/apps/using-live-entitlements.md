# Using live entitlements
Context: Discord developer reference: Using live entitlements
[Source](eligibility-subscriptions-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-subscriptions.md) / [Previous source section](using-test-entitlements.md)
<a id="source-using-live-entitlements"></a>

### Using Live Entitlements

 To test the complete payment flow, use a [premium styled button](https://docs.discord.com/developers/monetization/implementing-app-subscriptions#prompting-users-to-subscribe) or the Store page. Team members linked to the app automatically receive a 100% subscription discount, so they can purchase without a live payment method charge. Checkout creates a live subscription that renews until canceled and supports subscription renewal testing. If canceled, access stays active through the billing period end, represented by `current_period_end` on the [Subscription](https://docs.discord.com/developers/resources/subscription#subscription-object). Only entitlements created with the [create entitlement](https://docs.discord.com/developers/resources/entitlement#create-test-entitlement) endpoint can be deleted. Use Test Entitlements when development requires toggling premium access.
