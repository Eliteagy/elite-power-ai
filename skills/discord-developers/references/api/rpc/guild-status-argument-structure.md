# Guild status argument structure
Context: Discord developer reference: Guild status argument structure
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](error-data-structure.md) / [Following source section](commands-and-events-guild-create.md)
<a id="source-guild_status"></a> <a id="source-guild-status-argument-structure"></a> <a id="source-guild-status-dispatch-data-structure"></a> <a id="source-example-guild-status-dispatch-payload"></a>

#### GUILD_STATUS

###### Guild Status Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| guild_id | string | guild id to subscribe to for updates |

###### Guild Status Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| guild | partial guild object | guild with requested id |
| online | integer | online user count for the guild (deprecated; always 0) |

###### Example Guild Status Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "guild": {
      "id": "199737254929760256",
      "name": "test",
      "icon_url": null
    },
    "online": 0
  },
  "evt": "GUILD_STATUS"
}

```

