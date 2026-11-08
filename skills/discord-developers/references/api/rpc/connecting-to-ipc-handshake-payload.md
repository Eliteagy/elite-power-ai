# Connecting to ipc handshake payload
Context: Discord developer reference: Connecting to ipc handshake payload
[Source](connection-and-command-contracts-index.md) / [Owning endpoint, event, object or procedure conditions](connecting-to-ipc.md) / [Following source section](connecting-to-web-socket.md)
<a id="source-handshake-payload"></a> <a id="source-example-handshake"></a> <a id="source-opcodes"></a>

#### Handshake Payload

 The payload uses a JSON object record covering the RPC version and your application’s client ID.
| Field | Type | Description |
| --- | --- | --- |
| `v` | `integer` | RPC version |
| `client_id` | `string` | Your application’s client ID |

###### Example Handshake

```
[00 00 00 00] // Opcode 0 (Handshake)
[28 00 00 00] // Length 40
{"v":1,"client_id":"123456789012345678"}

```

 Upafter a successful request, Discord can respond with a `FRAME` (Opcode `1`) covering the `READY` event. After the handshake finishes, all subsequent requests and responses use the `FRAME` opcode. This internal structure of these frames follows this standard [RPC Payload structure](https://docs.discord.com/developers/topics/rpc#payloads-payload-structure)

###### Opcodes

| Opcode | Name | Description |
| --- | --- | --- |
| `0` | `HANDSHAKE` | Sent by the client to initiate the connection |
| `1` | `FRAME` | Used for all standard RPC commands and events |
| `2` | `CLOSE` | Sent by either side to close the connection |
| `3` | `PING` | Sent to check once the connection is alive |
| `4` | `PONG` | Response to a `PING` |

RPC over WebSocket (Deprecated)

This is one deprecated way, which is only available for old participants for private beta. It is preferable to use RPC which uses IPC.All Discord clients have one RPC server running on localhost that permits control over local Discord clients.

