# Lobby message object
Context: Discord developer reference: Lobby message object
[Source](webhook-events-index.md) / [Previous source section](social-sdk-message-objects.md) / [Following source section](message-object.md)
<a id="source-lobby-message-object"></a> <a id="source-lobby-message-structure"></a>

### Lobby Message Object

 Represents a message sent in a lobby or [Linked Channel](https://docs.discord.com/developers/discord-social-sdk/development-guides/linked-channels).

###### Lobby Message Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the message |
| type | integer | Type of message |
| content | string | Contents of the message |
| lobby_id | snowflake | ID of the lobby that received the message |
| channel_id | snowflake | ID of the channel where the message was sent |
| author | user object | Author of the message |
| metadata? | object | Extra message metadata as key-value pairs |
| flags | integer | Message flags represented as a bitfield |
| application_id? | snowflake | ID of the application, present only during active Social SDK sessions |

