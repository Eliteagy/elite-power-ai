# Auto Moderation Member Profile Rule

Date: 2024-05-31
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2914) · [Year index](INDEX.md)

<a id="source-auto-moderation-member-profile-rule"></a>


- Added Auto Moderation `MEMBER_PROFILE` rule [trigger_type](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-types). This rule checks whether a member's profile contains disallowed keywords.
- Added Auto Moderation `BLOCK_MEMBER_INTERACTION` [action type](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-action-object-action-types) for the `MEMBER_PROFILE` rule [trigger_type](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-types). The action partially "quarantines" the member and blocks most interactions in a specific server.
