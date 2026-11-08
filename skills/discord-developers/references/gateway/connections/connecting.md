# Connecting
Context: Discord developer reference: Connecting
[Source](connection-lifecycle-index.md) / [Previous source section](connection-lifecycle.md) / [Following source section](connecting-hello-event.md)
<a id="source-connecting"></a> <a id="source-gateway-url-query-string-params"></a>

### Connecting

 Before opening a Gateway connection, the app should call [Get Gateway](https://docs.discord.com/developers/events/gateway#get-gateway) or [Get Gateway Bot](https://docs.discord.com/developers/events/gateway#get-gateway-bot). Either endpoint returns a payload with a `url` field containing the WSS URL for the WebSocket connection. [Get Gateway Bot](https://docs.discord.com/developers/events/gateway#get-gateway-bot) also returns recommended shard count and session start limit information for the app. On the first call to either [Get Gateway](https://docs.discord.com/developers/events/gateway#get-gateway) or [Get Gateway Bot](https://docs.discord.com/developers/events/gateway#get-gateway-bot), cache `url` and reuse it for later Gateway reconnects. When connecting, explicitly pass API version and [encoding](https://docs.discord.com/developers/events/gateway#encoding-and-compression) as query parameters. You may also include whether Discord should [compress](https://docs.discord.com/developers/events/gateway#encoding-and-compression) data sent to the app. `wss://gateway.discord.gg/?v=10&encoding=json` is an example WSS URL for a Gateway connection.

###### Gateway URL Query String Params

| Field | Type | Description | Accepted Values |
| --- | --- | --- | --- |
| v | integer | API Version to use | API version |
| encoding | string | Encoding used for received gateway packets | `json` or `etf` |
| compress? | string | Optional transport compression for gateway packets | `zlib-stream` or `zstd-stream` |

