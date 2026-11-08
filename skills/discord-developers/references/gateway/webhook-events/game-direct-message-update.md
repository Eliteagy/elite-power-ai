# Game direct message update
Context: Discord developer reference: Game direct message update
[Source](webhook-events-index.md) / [Owning endpoint, event, object or procedure conditions](event-types.md) / [Previous source section](game-direct-message-create.md) / [Following source section](game-direct-message-delete.md)
<a id="source-game-direct-message-update"></a> <a id="source-game-direct-message-update-structure"></a> <a id="source-game-direct-message-update-example"></a>

#### Game Direct Message Update

 `GAME_DIRECT_MESSAGE_UPDATE` fires after a game DM changes and at least one participant currently has an active Social SDK session.

###### Game Direct Message Update Structure

 The inner payload is a [message object](https://docs.discord.com/developers/events/webhook-events#message-object) or an [SDK DM message object](https://docs.discord.com/developers/events/webhook-events#sdk-dm-message-object).

###### Game Direct Message Update Example

```
{
  "version": 1,
  "application_id": "1234567765431056709",
  "type": 1,
  "event": {
    "type": "GAME_DIRECT_MESSAGE_UPDATE",
    "timestamp": "2025-08-14T16:44:31.847073",
    "data": {
      "id": "1405591838810706081",
      "content": "almost ready to queue?",
      "channel_id": "1404960877324533784",
      "author": {
        // user data
      },
      "recipient_id": "1404960877324533784"
    }
  }
}

```

