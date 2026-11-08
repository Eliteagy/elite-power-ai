# Game direct message create
Context: Discord developer reference: Game direct message create
[Source](webhook-events-index.md) / [Owning endpoint, event, object or procedure conditions](event-types.md) / [Previous source section](lobby-message-delete.md) / [Following source section](game-direct-message-update.md)
<a id="source-game-direct-message-create"></a> <a id="source-game-direct-message-create-structure"></a> <a id="source-game-direct-message-create-example"></a>

#### Game Direct Message Create

 `GAME_DIRECT_MESSAGE_CREATE` fires after a game DM is created and at least one participant currently has an active Social SDK session.

###### Game Direct Message Create Structure

 The inner payload is a [message object](https://docs.discord.com/developers/events/webhook-events#message-object) or an [SDK DM message object](https://docs.discord.com/developers/events/webhook-events#sdk-dm-message-object).

###### Game Direct Message Create Example

```
{
  "version": 1,
  "application_id": "1234567765431056709",
  "type": 1,
  "event": {
    "type": "GAME_DIRECT_MESSAGE_CREATE",
    "timestamp": "2025-08-14T18:09:38.063234",
    "data": {
      "id": "1405614357781545021",
      "type": 0,
      "content": "get in friend, we're going raiding",
      "channel_id": "1405604229820715098",
      "author": {
        // user data
      },
      "timestamp": "2025-08-14T18:09:37.947000+00:00",
      "application_id": "1234567765431056709",
      "attachments": []
    }
  }
}

```

