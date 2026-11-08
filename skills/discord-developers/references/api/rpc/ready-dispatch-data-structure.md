# Ready dispatch data structure
Context: Discord developer reference: Ready dispatch data structure
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](close-activity-request.md) / [Following source section](error-data-structure.md)
<a id="source-ready"></a> <a id="source-ready-dispatch-data-structure"></a> <a id="source-rpc-server-configuration-object"></a> <a id="source-example-ready-dispatch-payload"></a>

#### READY

###### Ready Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| v | integer | RPC version |
| config | rpc server configuration object | server configuration |
| user | partial user object | user that the current connection is with |

###### RPC Server Configuration Object

| Field | Type | Description |
| --- | --- | --- |
| cdn_host | string | server’s cdn |
| api_endpoint | string | server’s api endpoint |
| environment | string | server’s environment |

###### Example Ready Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "v": 1,
    "config": {
      "cdn_host": "cdn.discordapp.com",
      "api_endpoint": "//discord.com/api",
      "environment": "production"
    },
    "user": {
      "id": "53908232506183680",
      "username": "Mason",
      "discriminator": "1337",
      "avatar": null
    }
  },
  "evt": "READY"
}

```

