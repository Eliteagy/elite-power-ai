# Get gateway bot
Context: Discord developer reference: Get gateway bot
[Source](gateway-endpoints-and-session-limits-index.md) / [Previous source section](get-gateway.md) / [Following source section](session-start-limit-structure.md)
<a id="source-get-gateway-bot"></a> <a id="source-json-response"></a> <a id="source-example-response-1"></a>

### Get Gateway Bot

  This endpoint requires authentication with a valid bot token. The response contains the data from [Get Gateway](https://docs.discord.com/developers/events/gateway#get-gateway) plus additional metadata useful for operating large or [sharded](https://docs.discord.com/developers/events/gateway#sharding) bots. Unlike [Get Gateway](https://docs.discord.com/developers/events/gateway#get-gateway), this route should not be cached for long periods because the returned value may differ between calls and changes as the bot joins or leaves guilds.

###### JSON Response

| Field | Type | Description |
| --- | --- | --- |
| url | string | WSS URL for connecting to the Gateway |
| shards | integer | Suggested shard count for the connection |
| session_start_limit | session_start_limit object | Current session start limit details |

###### Example Response

```
{
  "url": "wss://gateway.discord.gg/",
  "shards": 9,
  "session_start_limit": {
    "total": 1000,
    "remaining": 999,
    "reset_after": 14400000,
    "max_concurrency": 1
  }
}

```

