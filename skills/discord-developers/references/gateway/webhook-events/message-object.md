# Message object
Context: Discord developer reference: Message object
[Source](webhook-events-index.md) / [Previous source section](lobby-message-object.md) / [Following source section](sdk-dm-message-object.md)
<a id="source-message-object"></a> <a id="source-additional-fields"></a>

### Message Object

 Standard [Message Object](https://docs.discord.com/developers/resources/message#message-object) with extra fields.

###### Additional Fields

| Field | Type | Description |
| --- | --- | --- |
| lobby_id? | snowflake | ID of the lobby where the message was created, present only for Linked Channel messages |
| channel | channel object | Channel object with recipient information |

