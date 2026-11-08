# Custom Incentivized Links

Date: 2025-04-11
Categories: Activities, Embedded App SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2297) · [Year index](INDEX.md)

<a id="source-custom-incentivized-links"></a> <a id="source-custom-incentivized-links-for-activities"></a>


### Custom Incentivized Links for Activities

Custom Incentivized Links control how incentivized link embeds appear to users. Create them in the developer portal or generate them from inside your activity. Incentivized Links can support referral links, promotions, deep links into an activity, and similar uses.
- shareLink now supports attaching custom params to shared game links with `custom_id`.
- `referrer_id` was removed from the shareLink API. Move any `referrer_id` usage to `custom_id`; passing `referrer_id` to shareLink silently fails.
Learn about [creating and managing Custom Incentivized Links](https://docs.discord.com/developers/activities/development-guides/growth-and-referrals#creating-and-managing-custom-incentivized-links) and [how to generate them from within your activity](https://docs.discord.com/developers/activities/development-guides/growth-and-referrals#generating-a-custom-link-within-your-activity) with the shareLink API. The Embedded App SDK is available through [npm](https://www.npmjs.com/package/@discord/embedded-app-sdk) and [GitHub](https://github.com/discord/embedded-app-sdk). Use the [installation guide and reference](https://docs.discord.com/developers/developer-tools/embedded-app-sdk) to get started.
