# How app subscriptions work
Context: Discord developer reference: How app subscriptions work
[Source](eligibility-subscriptions-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-subscriptions.md) / [Previous source section](types-of-subscriptions.md) / [Following source section](using-subscription-events-for-the-subscription-lifecycle.md)
<a id="source-how-app-subscriptions-work"></a>

### How App Subscriptions Work

- When a subscription SKU is purchased, Discord creates an [Entitlement](https://docs.discord.com/developers/resources/entitlement) tied to the user (or guild) and that Subscription [SKU](https://docs.discord.com/developers/resources/sku).
- Discord sends an `ENTITLEMENT_CREATE` event through the Gateway.
- The entitlement appears through the `LIST Entitlements` API endpoint.
- `Interaction Payloads` from the entitled user include the entitlement; guild subscriptions include it on payloads from users in that guild.
- The subscription appears through the `LIST Subscriptions` API endpoint.
- The entitlement remains granted indefinitely until the user cancels; `ends_at` is null.
- Canceling a subscription does not cause the app to receive entitlement events.
- When the subscription ends, the subscription entitlement ends too. Developers receive `ENTITLEMENT_UPDATE` with an `ends_at` timestamp showing when it ended.

