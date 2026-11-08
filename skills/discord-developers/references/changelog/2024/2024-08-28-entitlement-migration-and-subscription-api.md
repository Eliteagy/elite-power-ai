# Premium Apps: Entitlement Migration and New Subscription API

Date: 2024-08-28
Categories: Premium Apps, Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2558) · [Year index](INDEX.md)

<a id="source-premium-apps-entitlement-migration-and-new-subscription-api"></a>


An update to this Change Log entry was published on **October 7, 2024**. See the [new Change Log entry](https://docs.discord.com/developers/change-log#updates-to-entitlement-migration-guide) for current details. Discord is migrating entitlements to behavior where they do not end until explicitly canceled, which is a breaking change for subscription management. The new [Subscription API](https://docs.discord.com/developers/resources/subscription) and [Subscription Events](https://docs.discord.com/developers/events/gateway-events#subscriptions) support subscription-related handling. Rollout begins on October 1, 2024 for all existing applications with user and guild subscription SKU entitlements.

<a id="source-entitlement-migration-details"></a>

#### Entitlement Migration Details

- `ENTITLEMENT_CREATE` events now fire with `ends_at` set to null for ongoing subscriptions, marking an indefinite entitlement.
- `ENTITLEMENT_UPDATE` events fire only when a subscription ends, with `ends_at` carrying the end date.
- Discord-managed Subscription entitlements use `type` value `PURCHASE` (type `1`) instead of `APPLICATION_SUBSCRIPTION` (type `8`).

<a id="source-migration-plan--guide"></a>

### Migration Plan & Guide:

As of **October 1, 2024**, existing entitlements that grant access to user-subscription and guild-subscription SKUs automatically move to the new system on their renewal date. This creates a month-long migration window for entitlements to move on renewal. Developers should update systems before rollout to handle `ENTITLEMENT_CREATE` and `ENTITLEMENT_UPDATE` as described in the migration guide and avoid service disruptions.

<a id="source-introducing-a-new-subscription-api"></a>

### Introducing a New Subscription API

Under the new entitlement behavior, subscription SKU entitlements no longer emit events at the start of each new billing period. Subscription lifecycle handling should move to the new [Subscription API](https://docs.discord.com/developers/monetization/implementing-app-subscriptions#using-the-subscription-api). Use the [Subscription resource](https://docs.discord.com/developers/resources/subscription) for calling the Subscription API and responding to Subscription events. For implementation details, read [Implementing App Subscriptions](https://docs.discord.com/developers/monetization/implementing-app-subscriptions#using-the-subscription-api). This API is available now.

<a id="source-monetization-documentation-updates"></a>

### Monetization Documentation Updates

Premium Apps documentation was updated for these changes.
- New [Enabling Monetization](https://docs.discord.com/developers/monetization/enabling-monetization) page covers team setup, payout management, and enabling monetization for apps
- New [Managing SKUs](https://docs.discord.com/developers/monetization/managing-skus#creating-a-sku) page explains creating, updating, publishing, and promoting SKUs
- [Entitlement](https://docs.discord.com/developers/resources/entitlement), [SKU](https://docs.discord.com/developers/resources/sku), and [Subscription](https://docs.discord.com/developers/resources/subscription) resources were moved or added to the **Resources** section
- [Implementing App Subscriptions](https://docs.discord.com/developers/monetization/implementing-app-subscriptions) and [Implementing One-Time Purchases](https://docs.discord.com/developers/monetization/implementing-one-time-purchases) guides were updated

[Entitlement renewal migration](2024-08-28-entitlement-renewal-migration.md).
