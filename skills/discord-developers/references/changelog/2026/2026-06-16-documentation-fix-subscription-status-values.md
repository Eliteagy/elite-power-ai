# Documentation Fix: Subscription Status Values

Date: 2026-06-16
Categories: HTTP API
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L473) · [Year index](INDEX.md)

<a id="source-documentation-fix-subscription-status-values"></a>






The documentation had the integer values for `INACTIVE` and `ENDING` subscription statuses reversed. The correct mapping is `INACTIVE` = `1` and `ENDING` = `2`, matching the [Subscription Statuses](https://docs.discord.com/developers/resources/subscription#subscription-statuses) reference. Both the reference and the [Implementing App Subscriptions](https://docs.discord.com/developers/monetization/implementing-app-subscriptions) guide, which previously showed the swapped lifecycle values, have been corrected. The API has always returned these values; only the documentation was wrong. If your app branches on numeric `status`, verify that `1` is handled as `INACTIVE` and `2` as `ENDING`. The issue was found while comparing the documentation with [our OpenAPI spec](https://github.com/discord/discord-api-spec) in [this commit](https://github.com/discord/discord-api-spec/commit/cdbd53a2ac5144536bfee2a34e6d0de13e08eec0).
