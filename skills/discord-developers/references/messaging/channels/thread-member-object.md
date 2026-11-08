# Thread member object
Context: Discord developer reference: Thread member object
[Source](channel-objects-and-settings-index.md) / [Previous source section](thread-metadata-object.md) / [Following source section](default-reaction-object.md)
<a id="source-thread-member-object"></a> <a id="source-thread-member-structure"></a>

### Thread Member Object

 A thread member object describes a user who has joined a thread.

###### Thread Member Structure

| Field | Type | Description |
| --- | --- | --- |
| id? * | snowflake | ID of the thread |
| user_id? * | snowflake | ID of the user |
| join_timestamp | ISO8601 timestamp | time when the user most recently joined the thread |
| flags | integer | user-specific thread settings; currently used only for notifications |
| member? * ** | guild member object | Additional information about the user |

 * These fields are not included on the member embedded in each thread in the [GUILD_CREATE](https://docs.discord.com/developers/events/gateway-events#guild-create) event. ** The `member` field appears only when `with_member` is `true` for [List Thread Members](https://docs.discord.com/developers/resources/channel#list-thread-members) or [Get Thread Member](https://docs.discord.com/developers/resources/channel#get-thread-member).

