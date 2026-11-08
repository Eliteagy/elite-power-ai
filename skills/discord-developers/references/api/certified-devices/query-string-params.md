# Query string params
Context: Discord developer reference: Query string params
[Source](certified-devices-index.md) / [Previous source section](how-s-it-work.md) / [Following source section](getting-device-uuid.md)
<a id="source-connecting"></a> <a id="source-query-string-params"></a> <a id="source-http"></a> <a id="source-websocket"></a>

### Connecting

###### Query String Params

| Name | Value | Required |
| --- | --- | --- |
| v | `1` | All |
| client_id | your app’s client id | All |
| encoding | `json` | WebSocket |

 Send device event updates to these URIs:

###### HTTP

```
http://127.0.0.1:PORT/rpc?v=1&client_id=YOUR_CLIENT_ID

```

###### WebSocket

```
ws://127.0.0.1:PORT?v=1&client_id=YOUR_CLIENT_ID&encoding=json

```

 `PORT` covers ports `6463` through `6473`. Try the ports in that range until the request returns a success status or the socket connects, then reuse the successful port for the session. Keep Discord synchronized with the hardware by sending an update whenever hardware mute changes, or when a voice feature such as echo cancellation is turned on or off by the user. These updates let Discord defer when your hardware is handling optimization, or assist when it is not. Every update must include the complete `devices` array, ordered by your priority preference. For example, place a headset first if Discord should attempt to choose it as the default.

