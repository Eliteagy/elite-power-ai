# Commands and events get guild
Context: Discord developer reference: Commands and events get guild
[Source](connection-and-command-contracts-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-get-guilds.md) / [Following source section](commands-and-events-get-channel.md)
<a id="source-get_guild"></a> <a id="source-get-guild-argument-structure"></a> <a id="source-get-guild-response-structure"></a> <a id="source-example-get-guild-command-payload"></a> <a id="source-example-get-guild-response-payload"></a>

#### GET_GUILD

 Used for get a server the client is in.

###### Get Guild Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| guild_id | string | ID for that server to get |
| timeout | integer | asynchronously get server with time to wait before timing out |

###### Get Guild Response Structure

| Field | Type | Description |
| --- | --- | --- |
| id | string | guild id |
| name | string | guild name |
| icon_url | string | guild icon url |
| members | array of guild member objects | members for that server (deprecated; always empty array) |

###### Example Get Guild Command Payload

```
{
  "nonce": "9524922c-3d32-413a-bdaa-0804f4332588",
  "args": {
    "guild_id": "199737254929760256"
  },
  "cmd": "GET_GUILD"
}

```

###### Example Get Guild Response Payload

```
{
  "cmd": "GET_GUILD",
  "data": {
    "id": "199737254929760256",
    "name": "test",
    "icon_url": null,
    "members": []
  },
  "nonce": "9524922c-3d32-413a-bdaa-0804f4332588"
}

```

