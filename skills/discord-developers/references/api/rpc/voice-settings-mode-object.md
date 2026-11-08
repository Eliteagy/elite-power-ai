# Voice settings mode object
Context: Discord developer reference: Voice settings mode object
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Owning endpoint, event, object or procedure conditions](get-voice-settings-response-structure.md) / [Following source section](voice-settings-output-object.md) / [Following source section](shortcut-key-combo-object.md)
<a id="source-rpc-part-2"></a> <a id="source-voice-settings-mode-object"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

###### Voice Settings Mode Object

| Field | Type | Description |
| --- | --- | --- |
| type | string | voice settings mode type; allowed values are `PUSH_TO_TALK` and `VOICE_ACTIVITY` |
| auto_threshold | boolean | whether voice activity sets the threshold automatically |
| threshold | float | voice activity threshold, in dB (min: -100, max: 0) |
| shortcut | shortcut key combo object | shortcut key combos for PTT |
| delay | float | PTT release delay, in ms (min: 0, max: 2000) |

