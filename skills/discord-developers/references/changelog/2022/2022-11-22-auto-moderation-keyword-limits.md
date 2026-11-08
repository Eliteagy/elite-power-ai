# Add Auto Moderation Allow List for Keyword Rules and Increase Max Keyword Rules Per Guild Limit

Date: 2022-11-22
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3421) · [Year index](INDEX.md)

<a id="source-add-auto-moderation-allow-list-for-keyword-rules-and-increase-max-keyword-rules-per-guild-limit"></a>


- Auto Moderation rules whose [trigger_type](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-types) is `KEYWORD` now accept `allow_list` inside [trigger_metadata](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata). Message content matching an `allow_list` keyword is ignored by that Auto Moderation `KEYWORD` rule. Each `allow_list` keyword may be a multi-word phrase and may use [wildcard symbols](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-keyword-matching-strategies).
- The per-guild maximum for rules using `KEYWORD` [trigger_type](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-types) increased from 3 to 5
- Each regex pattern in `regex_patterns` under [trigger_metadata](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata) may now be up to 260 characters instead of 75.
