# Entitlement Migration Completed

Date: 2024-11-05
Categories: Premium Apps
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2415) · [Year index](INDEX.md)

<a id="source-entitlement-migration-completed"></a>


The [entitlement migration](https://docs.discord.com/developers/change-log#premium-apps-entitlement-migration-and-new-subscription-api), which began on **October 1, 2024**, was completed on **November 1, 2024**.

<a id="source-whats-changed-1"></a>

### What’s Changed

- Documentation now treats the new entitlement system as standard behavior.
- For subscription-related entitlements, `ENTITLEMENT_UPDATE` occurs only when the subscription ends.
- The [entitlement object](https://docs.discord.com/developers/resources/entitlement#entitlement-object) now sets `ends_at` when the subscription ends.
- To detect subscription cancellation, listen for `SUBSCRIPTION_UPDATE` events or call the [Subscription API](https://docs.discord.com/developers/resources/subscription) and read `status` plus `canceled_at`.
See the [migration guide](https://docs.discord.com/developers/change-log#updates-to-entitlement-migration-guide) for migration details. October 25, 2024 Events User Apps
