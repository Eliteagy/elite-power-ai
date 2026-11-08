# Lobby message update
Context: Discord developer reference: Lobby message update
[Source](webhook-events-index.md) / [Owning endpoint, event, object or procedure conditions](event-types.md) / [Previous source section](lobby-message-create.md) / [Following source section](lobby-message-delete.md)
<a id="source-lobby-message-update"></a> <a id="source-lobby-message-update-structure"></a> <a id="source-lobby-message-update-example"></a>

#### Lobby Message Update

 `LOBBY_MESSAGE_UPDATE` fires when a lobby message is updated.

###### Lobby Message Update Structure

 The inner payload is a [lobby message object](https://docs.discord.com/developers/events/webhook-events#lobby-message-object) plus fields used for message updates.

###### Lobby Message Update Example

```
{
  "version": 1,
  "application_id": "1234567765431056709",
  "type": 1,
  "event": {
    "type": "LOBBY_MESSAGE_UPDATE",
    "timestamp": "2025-08-05T20:39:19.587872",
    "data": {
      "id": "1402390388030832792",
      "type": 0,
      "content": "noice",
      "lobby_id": "1402385687281537066",
      "channel_id": "1402389638311841883",
      "author": {
        // user data
      },
      "edited_timestamp": "2025-08-05T20:39:19.557970+00:00",
      "flags": 0,
      "timestamp": "2025-08-05T20:38:43.660000+00:00"
    }
  }
}

```

