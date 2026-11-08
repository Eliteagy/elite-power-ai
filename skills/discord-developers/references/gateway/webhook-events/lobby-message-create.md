# Lobby message create
Context: Discord developer reference: Lobby message create
[Source](webhook-events-index.md) / [Owning endpoint, event, object or procedure conditions](event-types.md) / [Previous source section](quest-user-enrollment.md) / [Following source section](lobby-message-update.md)
<a id="source-lobby-message-create"></a> <a id="source-lobby-message-create-structure"></a> <a id="source-lobby-message-create-example"></a>

#### Lobby Message Create

 `LOBBY_MESSAGE_CREATE` fires when a lobby message is created.

###### Lobby Message Create Structure

 The inner payload is a [lobby message object](https://docs.discord.com/developers/events/webhook-events#lobby-message-object).

###### Lobby Message Create Example

```
{
  "version": 1,
  "application_id": "1234567765431056709",
  "type": 1,
  "event": {
    "type": "LOBBY_MESSAGE_CREATE",
    "timestamp": "2024-10-18T18:41:21.109604",
    "data": {
      "id": "1397729799727878254",
      "type": 0,
      "content": "welcome to the party!",
      "lobby_id": "1397729744753266719",
      "channel_id": "1397729744753266719",
      "author": {
        // user data
      },
      "flags": 65536,
      "application_id": "1234567765431056709"
    }
  }
}

```

