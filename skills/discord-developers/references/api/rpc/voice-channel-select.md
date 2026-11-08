# Voice channel select
Context: Discord developer reference: Voice channel select
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-channel-create.md) / [Following source section](voice-settings-argument-structure.md)
<a id="source-voice_channel_select"></a> <a id="source-voice-channel-select-dispatch-data-structure"></a> <a id="source-example-voice-channel-select-dispatch-payload"></a>

#### VOICE_CHANNEL_SELECT

 No arguments

###### Voice Channel Select Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| channel_id | string | id of channel (`null` if none) |
| guild_id | string | id of guild (`null` if none) |

###### Example Voice Channel Select Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "channel_id": "199737254929760257",
    "guild_id": "199737254929760256"
  },
  "evt": "VOICE_CHANNEL_SELECT"
}

```

