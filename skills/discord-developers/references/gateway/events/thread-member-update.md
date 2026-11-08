# Thread member update
Context: Discord developer reference: Thread member update
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](channels-channel-create.md) / [Previous source section](thread-list-sync.md) / [Following source section](thread-members-update.md)
<a id="source-thread-member-update"></a> <a id="source-thread-member-update-event-extra-fields"></a>

#### Thread Member Update

 Dispatched when the current user's [thread member](https://docs.discord.com/developers/resources/channel#thread-member-object) object changes. The payload body is a [thread member](https://docs.discord.com/developers/resources/channel#thread-member-object) object plus an extra `guild_id` field. Most bots rarely need this event; for bots, it primarily confirms thread membership. See the [threads docs](https://docs.discord.com/developers/topics/threads) for more detail.

###### Thread Member Update Event Extra Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild |

