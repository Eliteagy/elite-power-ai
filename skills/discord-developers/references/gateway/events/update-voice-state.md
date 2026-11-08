# Update voice state
Context: Discord developer reference: Update voice state
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](request-channel-info.md) / [Following source section](request-channel-info-update-presence.md)
<a id="source-update-voice-state"></a> <a id="source-gateway-voice-state-update-structure"></a> <a id="source-example-gateway-voice-state-update"></a>

#### Update Voice State

 Sent by a client to join, change, or leave a voice channel.

###### Gateway Voice State Update Structure

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild |
| channel_id | ?snowflake | ID of the voice channel the client wants to enter, or null when disconnecting |
| self_mute | boolean | Whether the client is muted |
| self_deaf | boolean | Whether the client deafened |

###### Example Gateway Voice State Update

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

