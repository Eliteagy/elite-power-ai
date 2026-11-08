# Retrieving voice server information
Context: Discord developer reference: Retrieving voice server information
[Source](voice-handshake-and-encryption-index.md) / [Previous source section](voice-gateway-versioning.md) / [Following source section](establishing-a-voice-websocket-connection.md)
<a id="source-connecting-to-voice"></a> <a id="source-retrieving-voice-server-information"></a> <a id="source-gateway-voice-state-update-example"></a> <a id="source-example-voice-server-update-payload"></a>

### Connecting to Voice

### Retrieving Voice Server Information

 Connecting to a voice server, and therefore to a guild voice channel, starts by sending a request through the [Gateway](https://docs.discord.com/developers/events/gateway). The gateway returns the voice server information needed for the connection. Discord's voice platform is broadly distributed, so clients **should never** cache or persist the result of this call. To tell the gateway that voice connectivity is desired, send an [Opcode 4 Gateway Voice State Update](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway):

###### Gateway Voice State Update Example

```
{
  "op": 4,
  "d": {
    "guild_id": "41771983423143937",
    "channel_id": "127121515262115840",
    "self_mute": false,
    "self_deaf": false
  }
}

```

 When the request succeeds, the gateway sends *two* events: a [Voice State Update](https://docs.discord.com/developers/events/gateway-events#voice-state-update) event and a [Voice Server Update](https://docs.discord.com/developers/events/gateway-events#voice-server-update) event. Your library must wait for both before continuing. The first includes a new `session_id`, and the second carries the voice server data needed to create the voice connection:

###### Example Voice Server Update Payload

```
{
  "t": "VOICE_SERVER_UPDATE",
  "s": 2,
  "op": 0,
  "d": {
    "token": "my_token",
    "guild_id": "41771983423143937",
    "endpoint": "sweetwater-12345.discord.media:2048"
  }
}

```

 After receiving these values, open the voice WebSocket connection. A voice state update that moves channels inside the same guild can produce a VOICE_SERVER_UPDATE with the same `endpoint` as the prior VOICE_SERVER_UPDATE. The `token` still changes, and the previous session cannot be reused during a channel change even when the endpoint is unchanged. Bot users obey the voice channel's user limit when one is set. If the channel is full, your own Voice State Update will not produce Voice State Update or Voice Server Update events. The `MOVE_MEMBERS` permission bypasses that limit and allows joining whether or not the channel is full.

