# Voice state update sample event payload
Context: Discord developer reference: Voice state update sample event payload
[Source](../methods-commands-and-events-index.md) / [Owning endpoint, event, object or procedure conditions](voice-state-update.md) / [Previous source section](voice-state-update-required-scopes.md) / [Following source section](speaking-start.md)
<a id="source-sample-event-payload-2"></a>

#### Sample Event Payload

```
{
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

```

---

