# Get voice settings response structure
Context: Discord developer reference: Get voice settings response structure
[Source](connection-and-command-contracts-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](select-text-channel.md) / [Following source section](voice-settings-output-object.md)
<a id="source-get_voice_settings"></a> <a id="source-get-voice-settings-response-structure"></a> <a id="source-voice-settings-input-object"></a>

#### GET_VOICE_SETTINGS

###### Get Voice Settings Response Structure

| Field | Type | Description |
| --- | --- | --- |
| input | voice settings input object | input settings |
| output | voice settings output object | output settings |
| mode | voice settings mode object | voice mode settings |
| automatic_gain_control | boolean | state of automatic gain control |
| echo_cancellation | boolean | state of echo cancellation |
| noise_suppression | boolean | state of noise suppression |
| qos | boolean | state of voice quality of service |
| silence_warning | boolean | state of silence warning notice |
| deaf | boolean | state of self-deafen |
| mute | boolean | state of self-mute |

###### Voice Settings Input Object

| Field | Type | Description |
| --- | --- | --- |
| device_id | string | device id |
| volume | float | input voice level (min: 0, max: 100) |
| available_devices | array of objects | List of *read-only* device object records covering `id` and `name` string keys |

