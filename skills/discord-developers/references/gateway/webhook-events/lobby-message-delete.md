# Lobby message delete
Context: Discord developer reference: Lobby message delete
[Source](webhook-events-index.md) / [Owning endpoint, event, object or procedure conditions](event-types.md) / [Previous source section](lobby-message-update.md) / [Following source section](game-direct-message-create.md)
<a id="source-lobby-message-delete"></a> <a id="source-lobby-message-delete-structure"></a> <a id="source-lobby-message-delete-example"></a>

#### Lobby Message Delete

 `LOBBY_MESSAGE_DELETE` fires when a lobby message is deleted.

###### Lobby Message Delete Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the deleted message |
| lobby_id | snowflake | ID of the lobby where deletion occurred |

###### Lobby Message Delete Example

```
{
  "version": 1,
  "application_id": "1234567765431056709",
  "type": 1,
  "event": {
    "type": "LOBBY_MESSAGE_DELETE",
    "timestamp": "2025-08-05T21:44:09.412957",
    "data": {
      "id": "1402406637632884857",
      "lobby_id": "1402399883394285659"
    }
  }
}

```

