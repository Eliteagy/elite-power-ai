# Commands and events get channels
Context: Discord developer reference: Commands and events get channels
[Source](connection-and-command-contracts-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-get-channel.md) / [Following source section](set-user-voice-settings.md)
<a id="source-get_channels"></a> <a id="source-get-channels-argument-structure"></a> <a id="source-get-channels-response-structure"></a> <a id="source-example-get-channels-command-payload"></a> <a id="source-example-get-channels-response-payload"></a>

#### GET_CHANNELS

 Used for get a guild’s channel records the client is in.

###### Get Channels Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| guild_id | string | ID for that server to get channel records for |

###### Get Channels Response Structure

| Field | Type | Description |
| --- | --- | --- |
| channels | array of partial channel objects | Guild channel records the user account is in |

###### Example Get Channels Command Payload

```
{
  "nonce": "0dee7bd4-8f62-4ecc-9e0f-1b1839a4fa93",
  "args": {
    "guild_id": "199737254929760256"
  },
  "cmd": "GET_CHANNELS"
}

```

###### Example Get Channels Response Payload

```
{
  "cmd": "GET_CHANNELS",
  "data": {
    "channels": [
      {
        "id": "199737254929760256",
        "name": "general",
        "type": 0
      },
      {
        "id": "199737254929760257",
        "name": "General",
        "type": 2
      }
    ]
  },
  "nonce": "0dee7bd4-8f62-4ecc-9e0f-1b1839a4fa93"
}

```

