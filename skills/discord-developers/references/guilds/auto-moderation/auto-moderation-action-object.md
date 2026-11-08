# Auto moderation action object
Context: Discord developer reference: Auto moderation action object
[Source](auto-moderation-index.md) / [Previous source section](trigger-metadata-field-limits.md) / [Following source section](auto-moderation-permission-requirements.md)
<a id="source-auto-moderation-action-object"></a> <a id="source-auto-moderation-action-structure"></a> <a id="source-action-types"></a> <a id="source-action-metadata"></a>

### Auto Moderation Action Object

 Action executed when a rule triggers.

###### Auto Moderation Action Structure

| Field | Type | Description |
| --- | --- | --- |
| type | action type | the type of action |
| metadata? * | action metadata | extra metadata required when executing this action type |

 * Depending on `type`, this can be omitted. Use the `Associated Action Types` column in [action metadata](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-action-object-action-metadata) to determine which `type` values require `metadata`.

###### Action Types

| Action Type | Value | Description |
| --- | --- | --- |
| BLOCK_MESSAGE | 1 | blocks a member message so it is not posted; an optional custom explanation can be shown to members when blocking occurs |
| SEND_ALERT_MESSAGE | 2 | records user content in a specified channel |
| TIMEOUT | 3 | times out a user for the specified duration * |
| BLOCK_MEMBER_INTERACTION | 4 | prevents a member from using text, voice, or other interaction surfaces |

 * A `TIMEOUT` action is valid only for `KEYWORD` and `MENTION_SPAM` rules. Using the `TIMEOUT` action type requires `MODERATE_MEMBERS`.

###### Action Metadata

 Extra data used while executing an action. The relevant fields depend on the [action type](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-action-object-action-types).
| Field | Type | Associated Action Types | Description | Constraints |
| --- | --- | --- | --- | --- |
| channel_id | snowflake | SEND_ALERT_MESSAGE | channel where user content is logged | existing channel |
| duration_seconds | integer | TIMEOUT | timeout duration in seconds | maximum of 2419200 seconds (4 weeks) |
| custom_message? | string | BLOCK_MESSAGE | extra explanation shown to members when their message is blocked | maximum of 150 characters |

