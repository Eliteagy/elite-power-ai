# Send events identify
Context: Discord developer reference: Send events identify
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](send-events.md) / [Following source section](send-events-resume.md)
<a id="source-identify"></a> <a id="source-identify-structure"></a> <a id="source-identify-connection-properties"></a> <a id="source-example-identify"></a>

#### Identify

 Starts the initial gateway handshake. The [Gateway documentation](https://docs.discord.com/developers/events/gateway#identifying) covers the identifying process.

###### Identify Structure

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| token | string | Authentication token | - |
| properties | object | Connection properties | - |
| compress? | boolean | Whether packet compression is supported by this connection | false |
| large_threshold? | integer | Value between 50 and 250; the gateway stops including offline members in the guild member list once the total member count reaches this value | 50 |
| shard? | array of two integers (shard_id, num_shards) | Used for Guild Sharding | - |
| presence? | update presence object | Presence structure containing the starting presence data | - |
| intents | integer | Gateway Intents requested for delivery | - |

###### Identify Connection Properties

| Field | Type | Description |
| --- | --- | --- |
| os | string | Your operating system |
| browser | string | Your library name |
| device | string | Your library name |

 These fields once used prefixed names, such as `prefixed(i.e:‘browser`, but [this syntax is deprecated](https://docs.discord.com/developers/change-log#updated-connection-property-field-names). The older names may still function today, but non-prefixed fields are recommended.

###### Example Identify

```
{
  "op": 2,
  "d": {
    "token": "my_token",
    "properties": {
      "os": "linux",
      "browser": "disco",
      "device": "disco"
    },
    "compress": true,
    "large_threshold": 250,
    "shard": [0, 1],
    "presence": {
      "activities": [{
        "name": "Cards Against Humanity",
        "type": 0
      }],
      "status": "dnd",
      "since": 91879201,
      "afk": false
    },
    // These intents represent 1 << 0 for GUILDS and 1 << 2 for GUILD_MODERATION
    // This connection will only receive the events defined in those two intents
    "intents": 5
  }
}

```

