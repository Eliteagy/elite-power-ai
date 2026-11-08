# Voice settings argument structure
Context: Discord developer reference: Voice settings argument structure
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](voice-channel-select.md) / [Following source section](voice-state-create-voice-state-update-voice-state-delete.md)
<a id="source-voice_settings_update"></a> <a id="source-voice-settings-argument-structure"></a> <a id="source-example-voice-settings-dispatch-payload"></a>

#### VOICE_SETTINGS_UPDATE

###### Voice Settings Argument Structure

 Takes no arguments. Dispatches the [Get Voice Settings](https://docs.discord.com/developers/topics/rpc#getvoicesettings) response.

###### Example Voice Settings Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "input": {
      "available_devices": [
        {
          "id": "default",
          "name": "Default"
        },
        {
          "id": "Built-in Microphone",
          "name": "Built-in Microphone"
        }
      ],
      "device_id": "default",
      "volume": 49.803921580314636
    },
    "output": {
      "available_devices": [
        {
          "id": "default",
          "name": "Default"
        },
        {
          "id": "Built-in Output",
          "name": "Built-in Output"
        }
      ],
      "device_id": "default",
      "volume": 93.00000071525574
    },
    "mode": {
      "type": "VOICE_ACTIVITY",
      "auto_threshold": true,
      "threshold": -46.92622950819673,
      "shortcut": [{ "type": 0, "code": 12, "name": "i" }],
      "delay": 98.36065573770492
    },
    "automatic_gain_control": false,
    "echo_cancellation": false,
    "noise_suppression": false,
    "qos": false,
    "silence_warning": false
  },
  "evt": "VOICE_SETTINGS_UPDATE"
}

```

