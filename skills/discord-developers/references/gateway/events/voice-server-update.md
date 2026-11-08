# Voice server update
Context: Discord developer reference: Voice server update
[Source](reaction-presence-and-user-events-index.md) / [Owning endpoint, event, object or procedure conditions](voice-channel-effect-send.md) / [Previous source section](voice-state-update.md) / [Following source section](webhooks-webhooks-update.md)
<a id="source-voice-server-update"></a> <a id="source-voice-server-update-event-fields"></a> <a id="source-example-voice-server-update-payload"></a>

#### Voice Server Update

 Emitted when a guild voice server changes. It appears during initial voice connection and when the active voice instance fails over to another server. If `endpoint` is null, the allocated voice server disappeared and Discord is reallocating it. Disconnect from the current voice server, then wait for a newly allocated voice server before reconnecting.

###### Voice Server Update Event Fields

| Field | Type | Description |
| --- | --- | --- |
| token | string | Voice connection token |
| guild_id | snowflake | Guild associated with this voice server update. |
| endpoint | ?string | Voice server host |

###### Example Voice Server Update Payload

```
{
  "token": "my_token",
  "guild_id": "41771983423143937",
  "endpoint": "sweetwater-12345.discord.media:2048"
}

```

