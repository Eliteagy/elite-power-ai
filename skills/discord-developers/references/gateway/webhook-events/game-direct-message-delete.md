# Game direct message delete
Context: Discord developer reference: Game direct message delete
[Source](webhook-events-index.md) / [Owning endpoint, event, object or procedure conditions](event-types.md) / [Previous source section](game-direct-message-update.md) / [Following source section](social-sdk-message-objects.md)
<a id="source-game-direct-message-delete"></a> <a id="source-game-direct-message-delete-structure"></a> <a id="source-game-direct-message-delete-example"></a>

#### Game Direct Message Delete

 `GAME_DIRECT_MESSAGE_DELETE` fires after a game DM is removed and at least one participant currently has an active Social SDK session.

###### Game Direct Message Delete Structure

 The inner payload is a [message object](https://docs.discord.com/developers/events/webhook-events#message-object) or an [SDK DM message object](https://docs.discord.com/developers/events/webhook-events#sdk-dm-message-object).

###### Game Direct Message Delete Example

```
{
  "version": 1,
  "application_id": "1234567765431056709",
  "type": 1,
  "event": {
    "type": "GAME_DIRECT_MESSAGE_DELETE",
    "timestamp": "2025-08-20T17:01:50.099204",
    "data": {
      "id": "1407771600643686503",
      "type": 0,
      "content": "cant make it in time",
      "channel_id": "1405604229820715098",
      "author": {
        // user data
      },
      "timestamp": "2025-08-20T17:01:44.725000+00:00",
      "flags": 0,
      "attachments": [],
      "components": []
    }
  }
}

```

