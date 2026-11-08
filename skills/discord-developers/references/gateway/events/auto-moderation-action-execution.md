# Auto moderation action execution
Context: Discord developer reference: Auto moderation action execution
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](auto-moderation.md) / [Previous source section](auto-moderation-rule-delete.md) / [Following source section](channels-channel-create.md)
<a id="source-auto-moderation-action-execution"></a> <a id="source-auto-moderation-action-execution-event-fields"></a>

#### Auto Moderation Action Execution

 Sent after a rule triggers and its action runs, such as when a message is blocked.

###### Auto Moderation Action Execution Event Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild where the action ran |
| action | auto moderation action object | Action which was executed |
| rule_id | snowflake | ID of the rule associated with the action |
| rule_trigger_type | trigger_type | Trigger type for the rule that fired |
| user_id | snowflake | ID of the user whose content caused the rule to fire |
| channel_id? | snowflake | ID of the channel where the user content appeared |
| message_id? | snowflake | ID of the user message containing the content, when any exists * |
| alert_system_message_id? | snowflake | ID of the system auto moderation message posted because of this action ** |
| content *** | string | User-generated text content |
| matched_keyword | ?string | Rule-configured word or phrase that matched |
| matched_content *** | ?string | Substring from the content that matched the rule |

 * `message_id` is absent when [Auto Moderation](https://docs.discord.com/developers/resources/auto-moderation) blocked the message or when the content was not part of a message. ** `alert_system_message_id` is absent when this event is unrelated to an action of type `SEND_ALERT_MESSAGE`. *** The `MESSAGE_CONTENT` (`1 << 15`) [gateway intent](https://docs.discord.com/developers/events/gateway#gateway-intents) is required for the `content` and `matched_content` fields.

