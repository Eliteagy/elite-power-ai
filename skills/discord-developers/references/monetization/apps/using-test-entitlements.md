# Using test entitlements
Context: Discord developer reference: Using test entitlements
[Source](eligibility-subscriptions-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-subscriptions.md) / [Previous source section](using-the-subscription-api.md) / [Following source section](using-live-entitlements.md)
<a id="source-testing-your-app-subscription-implementation"></a> <a id="source-using-test-entitlements"></a>

### Testing Your App Subscription Implementation

### Using Test Entitlements

 Test by [creating](https://docs.discord.com/developers/resources/entitlement#create-test-entitlement) and [deleting](https://docs.discord.com/developers/resources/entitlement#delete-test-entitlement) test entitlements. They let you check subscribed and unsubscribed behavior for a user or guild, but do not run Discord checkout. Use [Using Live Entitlements](https://docs.discord.com/developers/monetization/implementing-app-subscriptions#using-live-entitlements) for the payment flow. Test Entitlements omit `starts_at` and `ends_at` because they remain valid until deleted.

