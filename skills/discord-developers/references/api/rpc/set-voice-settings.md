# Set voice settings
Context: Discord developer reference: Set voice settings
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](shortcut-key-combo-object.md) / [Following source section](example-set-voice-settings-response-payload.md)
<a id="source-set_voice_settings"></a> <a id="source-set-voice-settings-argument-and-response-structure"></a> <a id="source-example-set-voice-settings-command-payload"></a>

#### SET_VOICE_SETTINGS

 RPC currently allows only one app at a time to modify voice settings. When an app updates voice settings, Discord locks those settings, preventing any other simultaneously connected app from changing them. After the controlling app disconnects, the settings return to their previous values. If an app that already supplied voice settings connects again, the client reapplies that app's settings and locks voice settings again. This limitation is temporary and is planned to change. For voice settings updates, every field is optional, and Discord updates only the fields that are included.

###### Set Voice Settings Argument and Response Structure

| Field | Type | Description |
| --- | --- | --- |
| input | voice settings input object | input settings |
| output | voice settings output object | output settings |
| mode | voice settings mode object | voice mode settings |
| automatic_gain_control | boolean | state of automatic gain control |
| echo_cancellation | boolean | state of echo cancellation |
| noise_suppression | boolean | state of noise suppression |
| qos | boolean | voice quality of service state |
| silence_warning | boolean | state of silence warning notice |
| deaf | boolean | state of self-deafen |
| mute | boolean | state of self-mute |

###### Example Set Voice Settings Command Payload

```
{
  "nonce": "3d64ed55-ef6e-4bd5-99c9-677533babc22",
  "args": {
    "input": {
      "volume": 90.5
    }
  },
  "cmd": "SET_VOICE_SETTINGS"
}

```

