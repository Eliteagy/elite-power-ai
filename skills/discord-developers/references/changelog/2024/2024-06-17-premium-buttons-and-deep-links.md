# Premium Apps: New Premium Button Style & Deep Linking URL Schemes

Date: 2024-06-17
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2886) · [Year index](INDEX.md)

<a id="source-premium-apps-new-premium-button-style--deep-linking-url-schemes"></a>


**New Premium Button Style** adds a new `premium` [button style](https://docs.discord.com/developers/components/reference#button-button-styles) for use with a `sku_id` that points to an active [SKU](https://docs.discord.com/developers/resources/sku#sku-object). Developers can return targeted subscription products or one-time purchases to shape premium flows. See [button components with interactions](https://docs.discord.com/developers/components/reference#button) for implementation details. Interaction Response Type 10 is deprecated: `PREMIUM_REQUIRED (10)` now gives way to custom premium buttons. It still works for now, but may lose support later, so bots should move to the [premium button component](https://docs.discord.com/developers/components/reference#button-button-styles). See [gating features with premium interactions](https://docs.discord.com/developers/monetization/implementing-app-subscriptions#prompting-users-to-subscribe) for subscription gating patterns. **Deep Linking URL Schemes for SKUs and Store** adds two direct Application Directory url schemes. When posted in chat, these links render as rich embeds that let users open an app store page or a SKU detail modal.
- New [Store URL Scheme](https://docs.discord.com/developers/monetization/managing-skus#linking-to-your-store): `https://discord.com/application-directory/:appID/store`
- New [SKU URL Scheme](https://docs.discord.com/developers/monetization/managing-skus#linking-to-a-specific-sku): `https://discord.com/application-directory/:appID/store/:skuID`
