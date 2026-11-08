# Premium Apps: Multiple Subscription Tiers

Date: 2024-12-12
Categories: Premium Apps
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2384) · [Year index](INDEX.md)

<a id="source-premium-apps-multiple-subscription-tiers"></a>


Developers with monetization enabled can create and publish multiple subscription SKUs of the same type for one app. This supports different subscription tiers with separate benefits and prices, and users can move up or down between published subscription SKUs.

<a id="source-whats-changed"></a> <a id="source-developer-portal"></a>

### What’s Changed

#### Developer Portal

- The `Monetization` tab now supports publishing multiple subscription SKUs of the same type for an app.

<a id="source-apps-store-page"></a>

#### App’s Store Page

- When multiple subscription SKUs are published, users can upgrade or downgrade between the published subscription SKUs.

<a id="source-user-app-subscription-settings"></a>

#### User App Subscription Settings

- When multiple subscription SKUs are published, user app subscription settings let users upgrade or downgrade between them.
- These settings are under `User Settings → Subscriptions → App Subscriptions`.

<a id="source-subscription-object"></a>

#### Subscription Object

- The [subscription object](https://docs.discord.com/developers/resources/subscription#subscription-object) response for `SUBSCRIPTION_UPDATE` events and API endpoints now includes `renewal_sku_ids`.
- `renewal_sku_ids` is a snowflake list identifying the SKU(s) the user will receive at renewal.

<a id="source-updated-guide-managing-skus"></a>

#### Updated Guide: Managing SKUs

- [Managing SKUs](https://docs.discord.com/developers/monetization/managing-skus#creating-a-sku) now covers creating and managing multiple subscription SKUs.

<a id="source-updated-guide-implementing-app-subscriptions"></a>

#### Updated Guide: Implementing App Subscriptions

- [Implementing App Subscriptions](https://docs.discord.com/developers/monetization/implementing-app-subscriptions#supporting-upgrades-and-downgrades) now covers upgrade and downgrade support across multiple subscription SKUs.
