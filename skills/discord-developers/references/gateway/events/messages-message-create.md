# Messages message create
Context: Discord developer reference: Messages message create
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](messages.md) / [Following source section](messages-message-update.md)
<a id="source-message-create"></a> <a id="source-message-create-extra-fields"></a>

#### Message Create

 Dispatched after a message is created. The payload body is a [message](https://docs.discord.com/developers/resources/message#message-object) object plus these extra fields:

###### Message Create Extra Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id? | snowflake | ID of the guild where the message was sent, except for ephemeral messages |
| member? | partial guild member object | Member properties for the message author; absent for ephemeral messages and webhook messages |
| mentions | array of user objects, optionally with an additional partial member field | Users explicitly mentioned by the message |
| channel_type? | integer | Channel type where the message was sent |

