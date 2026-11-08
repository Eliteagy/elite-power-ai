# Set voice channel status
Context: Discord developer reference: Set voice channel status
[Source](channel-objects-and-settings-index.md) / [Previous source section](modify-channel.md) / [Following source section](delete-close-channel.md)
<a id="source-set-voice-channel-status"></a> <a id="source-json-params"></a>

### Set Voice Channel Status

  Set the status for a voice channel. Requires `SET_VOICE_CHANNEL_STATUS`; if the current user is not connected to that voice channel, `MANAGE_CHANNELS` is also required. Triggers a [Voice Channel Status Update](https://docs.discord.com/developers/events/gateway-events#voice-channel-status-update) Gateway event. This endpoint supports the `X-Audit-Log-Reason` header.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| status | ?string | new voice channel status, up to 500 characters |

