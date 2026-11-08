# Shortcut key combo object
Context: Discord developer reference: Shortcut key combo object
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Owning endpoint, event, object or procedure conditions](get-voice-settings-response-structure.md) / [Previous source section](voice-settings-mode-object.md) / [Following source section](set-voice-settings.md)
<a id="source-shortcut-key-combo-object"></a> <a id="source-key-types"></a> <a id="source-example-get-voice-settings-response-payload"></a>

###### Shortcut Key Combo Object

| Field | Type | Description |
| --- | --- | --- |
| type | integer | see key types |
| code | integer | key code |
| name | string | key name |

###### Key Types

| Type | Id |
| --- | --- |
| KEYBOARD_KEY | 0 |
| MOUSE_BUTTON | 1 |
| KEYBOARD_MODIFIER_KEY | 2 |
| GAMEPAD_BUTTON | 3 |

###### Example Get Voice Settings Response Payload

```
{
  "cmd": "GET_VOICE_SETTINGS",
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
    "silence_warning": false,
    "deaf": false,
    "mute": false
  },
  "nonce": "fa07c532-bb03-4f75-8b9a-397f5109afb6"
}

```

