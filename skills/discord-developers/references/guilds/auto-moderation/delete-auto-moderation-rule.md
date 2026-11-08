# Delete auto moderation rule
Context: Discord developer reference: Delete auto moderation rule
[Source](auto-moderation-index.md) / [Previous source section](modify-auto-moderation-rule.md)
<a id="source-delete-auto-moderation-rule"></a>

### Delete Auto Moderation Rule

  Delete a rule. Success returns `204` and emits an [Auto Moderation Rule Delete](https://docs.discord.com/developers/events/gateway-events#auto-moderation-rule-delete) Gateway event. The endpoint requires the `MANAGE_GUILD` [permission](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-permission-requirements) and supports `X-Audit-Log-Reason`.
