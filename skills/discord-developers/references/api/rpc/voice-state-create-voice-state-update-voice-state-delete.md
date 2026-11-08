# Voice state create voice state update voice state delete
Context: Discord developer reference: Voice state create voice state update voice state delete
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](voice-settings-argument-structure.md) / [Following source section](voice-connection-status.md)
<a id="source-voice_state_createvoice_state_updatevoice_state_delete"></a> <a id="source-voice-state-argument-structure"></a> <a id="source-example-voice-state-dispatch-payload"></a>

#### VOICE_STATE_CREATE/VOICE_STATE_UPDATE/VOICE_STATE_DELETE

 Dispatches channel voice state objects

###### Voice State Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| channel_id | string | channel id to subscribe to for updates |

###### Example Voice State Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "evt": "VOICE_STATE_CREATE",
  "data": {
    "voice_state": {
      "mute": false,
      "deaf": false,
      "self_mute": false,
      "self_deaf": false,
      "suppress": false
    },
    "user": {
      "id": "190320984123768832",
      "username": "test 2",
      "discriminator": "7479",
      "avatar": "b004ec1740a63ca06ae2e14c5cee11f3",
      "bot": false
    },
    "nick": "test user 2",
    "volume": 110,
    "mute": false,
    "pan": {
      "left": 1.0,
      "right": 1.0
    }
  }
}

```

