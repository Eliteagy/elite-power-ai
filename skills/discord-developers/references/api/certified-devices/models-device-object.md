# Models device object
Context: Discord developer reference: Models device object
[Source](certified-devices-index.md) / [Previous source section](rpc-command-example.md)
<a id="source-models"></a> <a id="source-device-object"></a> <a id="source-vendor-object"></a> <a id="source-model-object"></a> <a id="source-device-type"></a>

### Models

###### Device Object

| Field | Type | Description |
| --- | --- | --- |
| type | device type | the type of device |
| id | string | the device’s Windows UUID |
| vendor | vendor object | the hardware vendor |
| model | model object | the model of the product |
| related | array of strings | UUIDs of related devices |
| echo_cancellation?* | boolean | whether native echo cancellation is active on the device |
| noise_suppression?* | boolean | whether the device has native noise suppression enabled |
| automatic_gain_control?* | boolean | whether native automatic gain control is active for the device |
| hardware_mute?* | boolean | whether the hardware mute state is enabled for the device |

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

[RPCPrevious](https://docs.discord.com/developers/topics/rpc)⌘I
