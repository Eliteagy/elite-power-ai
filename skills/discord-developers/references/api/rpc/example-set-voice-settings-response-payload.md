# Example set voice settings response payload
Context: Discord developer reference: Example set voice settings response payload
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Owning endpoint, event, object or procedure conditions](set-voice-settings.md) / [Following source section](commands-and-events-subscribe.md)
<a id="source-example-set-voice-settings-response-payload"></a>

###### Example Set Voice Settings Response Payload

```
{
  "cmd": "SET_VOICE_SETTINGS",
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
      "volume": 90.5
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
    "silence_warning": false,
    "deaf": false,
    "mute": false
  },
  "nonce": "3d64ed55-ef6e-4bd5-99c9-677533babc22"
}

```

