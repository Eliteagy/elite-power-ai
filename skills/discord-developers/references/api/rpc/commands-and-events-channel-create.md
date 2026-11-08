# Commands and events channel create
Context: Discord developer reference: Commands and events channel create
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-guild-create.md) / [Following source section](voice-channel-select.md)
<a id="source-channel_create"></a> <a id="source-channel-create-dispatch-data-structure"></a> <a id="source-example-channel-create-dispatch-payload"></a>

#### CHANNEL_CREATE

 No arguments

###### Channel Create Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| id | string | channel id |
| name | string | name of the channel |
| type | integer | channel type (guild text: 0, guild voice: 2, dm: 1, group dm: 3) |

###### Example Channel Create Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "id": "199737254929760257",
    "name": "General",
    "type": 0
  },
  "evt": "CHANNEL_CREATE"
}

```

