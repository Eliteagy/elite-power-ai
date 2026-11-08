# Auto Moderation

Date: 2022-06-16
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3829) · [Year index](INDEX.md)

<a id="source-auto-moderation"></a>


Discord added [Auto Moderation feature](https://docs.discord.com/developers/resources/auto-moderation), allowing guilds to moderate message content for keywords, harmful links, and unwanted spam. The change includes:
- New endpoints for [creating](https://docs.discord.com/developers/resources/auto-moderation#create-auto-moderation-rule), [updating](https://docs.discord.com/developers/resources/auto-moderation#modify-auto-moderation-rule), and [deleting](https://docs.discord.com/developers/resources/auto-moderation#delete-auto-moderation-rule) Auto Moderation rules
- New gateway events for Auto Moderation rules being [created](https://docs.discord.com/developers/events/gateway-events#auto-moderation-rule-create) (`AUTO_MODERATION_RULE_CREATE`), [updated](https://docs.discord.com/developers/events/gateway-events#auto-moderation-rule-update) (`AUTO_MODERATION_RULE_UPDATE `), and [deleted](https://docs.discord.com/developers/events/gateway-events#auto-moderation-rule-delete) (`AUTO_MODERATION_RULE_DELETE `). These require the `AUTO_MODERATION_CONFIGURATION` (`1 << 20`) intent
- New gateway event emitted when an [action is executed](https://docs.discord.com/developers/events/gateway-events#auto-moderation-action-execution) (`AUTO_MODERATION_ACTION_EXECUTION`). This requires the `AUTO_MODERATION_EXECUTION` (`1 << 21`) intent
- New [audit log entries](https://docs.discord.com/developers/resources/audit-log#audit-log-entry-object-audit-log-events) for rule creation (`AUTO_MODERATION_RULE_CREATE`), update (`AUTO_MODERATION_RULE_UPDATE`), deletion (`AUTO_MODERATION_RULE_DELETE`), and Auto Moderation action execution (`AUTO_MODERATION_BLOCK_MESSAGE`)
