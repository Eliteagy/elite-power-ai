# Components of a premium app
[Source](sku-management-and-pricing-index.md) / [Previous source section](responding-with-a-premium-button.md) / [Following source section](components-of-a-premium-app.md)

<a id="source-components-of-a-premium-app"></a>

## Components of a Premium App

(Figure: Monetizing Your Discord App) Use Discord's built-in checkout and payment flow to sell subscriptions and one-time purchases in an app. For a higher-level Premium Apps overview, see [Premium Apps & Activities](https://docs.discord.com/developers/platform/app-monetization). App Monetization applies to [Bots](https://docs.discord.com/developers/bots/overview) and [Activities](https://docs.discord.com/developers/activities/overview).

---

<a id="source-components-of-a-premium-app-1"></a>

### Components of a Premium App

 A premium feature integration uses three main pieces from the Monetization API:
- [SKUs](https://docs.discord.com/developers/resources/sku) are the specific item or subscription offerings in the app. Each SKU identifies one distinct offer.
- [Entitlements](https://docs.discord.com/developers/resources/entitlement) show whether a user has access to a particular premium offering or SKU.
- [Subscriptions](https://docs.discord.com/developers/resources/subscription) model a continuing payment agreement for a recurring entitlement until cancellation.
