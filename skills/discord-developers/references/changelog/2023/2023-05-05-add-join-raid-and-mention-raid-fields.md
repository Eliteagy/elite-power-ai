# Add Join Raid and Mention Raid fields

Date: 2023-05-05
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3251) · [Year index](INDEX.md)

<a id="source-add-join-raid-and-mention-raid-fields"></a>


- Added Auto Moderation `mention_raid_protection_enabled` [trigger_metadata](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata) for the `MENTION_SPAM` [trigger_type](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-types). Enabling the field together with its parent `MENTION_SPAM` rule turns on basic detection for sudden mention surges that can signal mention raids.
- Added `safety_alerts_channel_id` [guild](https://docs.discord.com/developers/resources/guild#guild-object) field and [`RAID_ALERTS_DISABLED` guild feature flag](https://docs.discord.com/developers/resources/guild#guild-object-guild-features), both tied to join raid protection
