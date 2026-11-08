# Premium App Subscriptions Available in the US

Date: 2023-09-26
Categories: Premium Apps
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3164) · [Year index](INDEX.md)

<a id="source-premium-app-subscriptions-available-in-the-us"></a>


Starting today, eligible US-based developers can monetize verified apps with App Subscriptions. [App Subscriptions](https://docs.discord.com/developers/monetization/overview) let apps charge users for premium functionality through a recurring, monthly subscription.
- Manage subscription SKUs in the Developer Portal
- View monetization analytics in the Developer Portal
- Team owners can set up and manage payouts in Developer Portal
- New [SKUs](https://docs.discord.com/developers/resources/sku) and [Entitlements](https://docs.discord.com/developers/resources/entitlement) endpoints are available:
  - [List SKUs](https://docs.discord.com/developers/resources/sku#list-skus) `GET /applications/<application.id>/skus`
  - [List Entitlements](https://docs.discord.com/developers/resources/entitlement#list-entitlements) `GET /applications/<application.id>/entitlements`
  - [Create Test Entitlement](https://docs.discord.com/developers/resources/entitlement#create-test-entitlement) `POST /applications/<application.id>/entitlements`
  - [Delete Test Entitlement](https://docs.discord.com/developers/resources/entitlement#delete-test-entitlement) `DELETE /applications/<application.id>/entitlements/<entitlement.id>`

- [Gateway Events](https://docs.discord.com/developers/events/gateway-events#entitlements) for entitlements include `ENTITLEMENT_CREATE`, `ENTITLEMENT_UPDATE`, and `ENTITLEMENT_DELETE`
- New [`PREMIUM_REQUIRED (10)` interaction response type](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type) can prompt users to upgrade
- Interaction data payloads for [receiving and responding to interactions](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) now include `entitlements`, an array of [entitlement](https://docs.discord.com/developers/resources/entitlement) objects
See the [Monetization Overview](https://docs.discord.com/developers/monetization/overview) for eligibility details and monetization setup.
