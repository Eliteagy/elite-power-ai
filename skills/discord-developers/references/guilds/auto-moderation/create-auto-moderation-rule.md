# Create auto moderation rule
Context: Discord developer reference: Create auto moderation rule
[Source](auto-moderation-index.md) / [Previous source section](get-auto-moderation-rule.md) / [Following source section](modify-auto-moderation-rule.md)
<a id="source-create-auto-moderation-rule"></a> <a id="source-json-params"></a>

### Create Auto Moderation Rule

  Create a rule. On success, the response contains an [auto moderation rule](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object), and Discord emits an [Auto Moderation Rule Create](https://docs.discord.com/developers/events/gateway-events#auto-moderation-rule-create) Gateway event. The endpoint requires the `MANAGE_GUILD` [permission](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-permission-requirements) and supports `X-Audit-Log-Reason`.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | the rule name |
| event_type | integer | the event type |
| trigger_type | integer | the trigger type |
| trigger_metadata? * | object | the trigger metadata |
| actions | array of action objects | actions to run when the rule triggers |
| enabled? | boolean | whether the rule is enabled, default `False` |
| exempt_roles? | array of snowflakes | role ids exempt from the rule, maximum 20 |
| exempt_channels? | array of snowflakes | channel ids exempt from the rule, maximum 50 |

 * Depending on `trigger_type`, this may be omitted. Use the `Associated Trigger Types` column in [trigger metadata](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata) to determine which `trigger_type` values require `trigger_metadata`. See [Trigger Types](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-types) for per-guild limits on rules of each trigger type.

