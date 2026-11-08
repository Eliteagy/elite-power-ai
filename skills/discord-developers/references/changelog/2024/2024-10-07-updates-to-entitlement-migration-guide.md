# Updates to Entitlement Migration Guide

Date: 2024-10-07
Categories: Premium Apps
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2451) · [Year index](INDEX.md)

<a id="source-updates-to-entitlement-migration-guide"></a>


The entitlement migration began on **October 1, 2024** and continues through 11:59PM PST on **November 1, 2024**. The earlier migration guide was revised with current developer impact details. Summary of changes:
- The migration runs through November 1, 2024 so October renewals can move into the new entitlement system on renewal.
- `ENTITLEMENT_UPDATE` events occur only when a subscription ends.
- In `ENTITLEMENT_UPDATE` events, `ends_at` gives the timestamp for **when the entitlement is no longer valid**.
- The [entitlement object](https://docs.discord.com/developers/resources/entitlement#entitlement-object) sets `ends_at` when the subscription ends.
- To detect cancellation timing, listen for `SUBSCRIPTION_UPDATE` events or query the [Subscription API](https://docs.discord.com/developers/resources/subscription).
Open the [updated migration guide](https://docs.discord.com/developers/change-log#premium-apps-entitlement-migration-and-new-subscription-api). The full diff is in [Entitlement Migration Guide Updates](https://github.com/discord/discord-api-docs/pull/7201). September 26, 2024 Activities Embedded App SDK Premium Apps
