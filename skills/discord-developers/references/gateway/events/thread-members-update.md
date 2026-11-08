# Thread members update
Context: Discord developer reference: Thread members update
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](channels-channel-create.md) / [Previous source section](thread-member-update.md) / [Following source section](channel-pins-update.md)
<a id="source-thread-members-update"></a> <a id="source-thread-members-update-event-fields"></a>

#### Thread Members Update

 Dispatched when any user is added to or removed from a thread. Without the `GUILD_MEMBERS` [Gateway Intent](https://docs.discord.com/developers/events/gateway#gateway-intents), the current user receives it only for their own addition or removal.

###### Thread Members Update Event Fields

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the thread |
| guild_id | snowflake | ID of the guild |
| member_count | integer | Approximate thread member count, capped at 50 |
| added_members?* | array of thread member objects | Users added to the thread |
| removed_member_ids? | array of snowflakes | IDs of users removed from the thread |

 * In this gateway event, each added thread member's thread member object also carries the [guild member](https://docs.discord.com/developers/resources/guild#guild-member-object) object and nullable [presence](https://docs.discord.com/developers/events/gateway-events#presence) object.

