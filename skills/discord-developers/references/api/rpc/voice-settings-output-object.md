# Voice settings output object
Context: Discord developer reference: Voice settings output object
[Source](connection-and-command-contracts-index.md) / [Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Owning endpoint, event, object or procedure conditions](get-voice-settings-response-structure.md) / [Previous source section](voice-settings-mode-object.md)
<a id="source-voice-settings-output-object"></a>

###### Voice Settings Output Object
| Field | Type | Description |
| --- | --- | --- |
| device_id | string | device id |
| volume | float | output voice level (min: 0, max: 200) |
| available_devices | array of objects | array of *read-only* device objects; each object has `id` and `name` string keys |

