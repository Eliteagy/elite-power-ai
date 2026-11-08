# Premium Apps: One-Time Purchases and Store

Date: 2024-04-24
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2924) · [Year index](INDEX.md)

<a id="source-premium-apps-one-time-purchases-and-store"></a>


Premium Apps gained two new features: One-Time Purchases and Stores. **One-Time Purchases**
- **Durable Items**: A one-time purchase that is permanent and not consumed or renewed, such as lifetime access to an app's premium features.
- **Consumable Items**: A one-time, non-renewable purchase that grants access, such as a temporary power-up or game boost.
See [Implementing One-Time Purchases](https://docs.discord.com/developers/monetization/implementing-one-time-purchases) for purchase implementation guidance. **A Store for Your Premium App** adds a Store where your Premium App can showcase app subscriptions and one-time purchase items. You can create a unique Store page in the developer portal and add published subscription SKUs or one-time purchase SKUs to the store view, allowing users to buy them from your App Directory or Bot User Profile. For eligibility, setup, and monetization details, see the [Monetization Overview](https://docs.discord.com/developers/monetization/overview). **API Documentation Updates** added these items to public Monetization documentation:
- New [SKU Object Types](https://docs.discord.com/developers/resources/sku#sku-object-sku-types)
- New [Entitlement Object Types](https://docs.discord.com/developers/resources/entitlement#entitlement-object-entitlement-types)
- [Consume an Entitlement](https://docs.discord.com/developers/resources/entitlement#consume-an-entitlement) API endpoint
- `consumed` field on the [Entitlement](https://docs.discord.com/developers/resources/entitlement) resource
