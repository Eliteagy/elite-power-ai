# Modify auto moderation rule
Context: Discord developer reference: Modify auto moderation rule
[Source](auto-moderation-index.md) / [Previous source section](create-auto-moderation-rule.md) / [Following source section](delete-auto-moderation-rule.md)
<a id="source-modify-auto-moderation-rule"></a> <a id="source-json-params-1"></a>

### Modify Auto Moderation Rule

  Update an existing rule. A successful request returns an [auto moderation rule](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object) and emits an [Auto Moderation Rule Update](https://docs.discord.com/developers/events/gateway-events#auto-moderation-rule-update) Gateway event. The caller needs `MANAGE_GUILD` [permissions](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-permission-requirements). Every parameter is optional, and `X-Audit-Log-Reason` is supported.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | the rule name |
| event_type | integer | the event type |
| trigger_metadata? * | object | the trigger metadata |
| actions | array of action objects | actions to run when the rule triggers |
| enabled | boolean | whether the rule is enabled |
| exempt_roles | array of snowflakes | role ids exempt from the rule, maximum 20 |
| exempt_channels | array of snowflakes | channel ids exempt from the rule, maximum 50 |

 * Depending on `trigger_type`, this may be omitted. Use the `Associated Trigger Types` column in [trigger metadata](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata) to determine which `trigger_type` values require `trigger_metadata`.

