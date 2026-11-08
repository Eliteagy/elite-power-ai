# Lobby message object
Context: Discord developer reference: Lobby message object
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](send-lobby-message-parameters.md) / [Following source section](get-lobby-messages.md)
<a id="source-lobby-message-object"></a>

### Lobby Message Object

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | id of the message |
| type | integer | message type |
| content | string | message content |
| lobby_id | snowflake | id of the lobby where this message was sent |
| channel_id | snowflake | included for message-interface compatibility; equal to `lobby_id` |
| author | user object | user who sent the message |
| metadata? | ?dict<string, string> | dispatch-only metadata sent with the message |
| moderation_metadata? | ?dict<string, string> | moderation metadata set through Update Lobby Message Moderation Metadata |
| flags | integer | message flags bitfield |
| application_id | snowflake | application that sent the message |

