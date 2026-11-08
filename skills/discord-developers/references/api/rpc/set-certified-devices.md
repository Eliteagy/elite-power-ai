# Set certified devices
Context: Discord developer reference: Set certified devices
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-unsubscribe.md) / [Following source section](example-set-certified-devices-response-payload.md)
<a id="source-set_certified_devices"></a> <a id="source-set-certified-devices-argument-structure"></a> <a id="source-device-object"></a> <a id="source-vendor-object"></a> <a id="source-model-object"></a> <a id="source-device-type"></a> <a id="source-example-set-certified-devices-command-payload"></a>

#### SET_CERTIFIED_DEVICES

 Lets hardware manufacturers report the current state of certified devices connected to Discord.

###### Set Certified Devices Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| devices | array of certified device objects | list of the manufacturer's devices, ordered by priority |

###### Device Object

| Field | Type | Description |
| --- | --- | --- |
| type | device type | the type of device |
| id | string | the device’s Windows UUID |
| vendor | vendor object | the hardware vendor |
| model | model object | the model of the product |
| related | array of strings | UUIDs of related devices |
| echo_cancellation?* | boolean | whether native echo cancellation is enabled for the device |
| noise_suppression?* | boolean | whether native noise suppression is enabled for the device |
| automatic_gain_control?* | boolean | whether native automatic gain control is enabled for the device |
| hardware_mute?* | boolean | whether the device is muted in hardware |

 *These fields apply only to `AUDIO_INPUT` device types

###### Vendor Object

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the vendor |
| url | string | url for the vendor |

###### Model Object

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the model |
| url | string | url for the model |

###### Device Type

| Type | Value |
| --- | --- |
| AUDIO_INPUT | ”audioinput” |
| AUDIO_OUTPUT | ”audiooutput” |
| VIDEO_INPUT | ”videoinput” |

###### Example Set Certified Devices Command Payload

```
{
  "nonce": "9b4e9711-97f3-4f35-b047-32c82a51978e",
  "cmd": "SET_CERTIFIED_DEVICES",
  "args": {
    "devices": [
      {
        "type": "audioinput",
        "id": "aafc2003-da0e-42a3-b982-6a17a2812510",
        "vendor": {
          "name": "SteelSeries",
          "url": "https://steelseries.com"
        },
        "model": {
          "name": "Arctis 7",
          "url": "https://steelseries.com/gaming-headsets/arctis-7"
        },
        "related": ["aafc2003-da0e-42a3-b982-6a17a2819999"],
        "echo_cancellation": true,
        "noise_suppression": true,
        "automatic_gain_control": true,
        "hardware_mute": false
      }
    ]
  }
}

```

