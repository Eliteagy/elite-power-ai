# Commands and events guild create
Context: Discord developer reference: Commands and events guild create
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](guild-status-argument-structure.md) / [Following source section](commands-and-events-channel-create.md)
<a id="source-guild_create"></a> <a id="source-guild-create-dispatch-data-structure"></a> <a id="source-example-guild-create-dispatch-payload"></a>

#### GUILD_CREATE

 No arguments

###### Guild Create Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| id | string | guild id |
| name | string | name of the guild |

###### Example Guild Create Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "id": "199737254929767562",
    "name": "Test Server"
  },
  "evt": "GUILD_CREATE"
}

```

