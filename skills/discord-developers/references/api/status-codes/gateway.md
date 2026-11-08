# Gateway
Context: Discord developer reference: Gateway
[Source](gateway-http-and-api-status-index.md) / [Following source section](voice.md)
<a id="source-opcodes-and-status-codes-part-1"></a> <a id="source-gateway"></a> <a id="source-gateway-opcodes"></a> <a id="source-gateway-close-event-codes"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

### Gateway

 Discord gateway events carry an opcode describing the payload type. Gateway connections can close; when they do, the close code identifies the reason.

###### Gateway Opcodes

| Code | Name | Client Action | Description |
| --- | --- | --- | --- |
| 0 | Dispatch | Receive | An event was dispatched. |
| 1 | Heartbeat | Send/Receive | Client heartbeat sent at regular intervals to keep the connection open. |
| 2 | Identify | Send | Opens a new session as part of the initial handshake. |
| 3 | Presence Update | Send | Update the client’s presence. |
| 4 | Voice State Update | Send | Moves the client into, out of, or between voice channels. |
| 6 | Resume | Send | Continues a disconnected session from its previous state. |
| 7 | Reconnect | Receive | Reconnect and resume the session immediately. |
| 8 | Request Guild Members | Send | Fetches offline guild member information for a large guild. |
| 9 | Invalid Session | Receive | The session was invalidated; reconnect, then identify/resume as appropriate. |
| 10 | Hello | Receive | Delivered right after connection and includes the `heartbeat_interval` value to use. |
| 11 | Heartbeat ACK | Receive | Acknowledges a heartbeat after it is received. |
| 31 | Request Soundboard Sounds | Send | Fetches soundboard sound information for a set of guilds. |
| 43 | Request Channel Info | Send | Fetches ephemeral channel data for channels in a guild. |

###### Gateway Close Event Codes

 Treat some gateway close codes as stop signals so clients do not enter broken reconnect loops. Causes include expired tokens and invalid identification. The table lists Discord's gateway close codes and flags the ones that should not be retried.
| Code | Description | Explanation | Reconnect |
| --- | --- | --- | --- |
| 4000 | Unknown error | Discord could not determine the failure. Reconnect may be worth trying. | true |
| 4001 | Unknown opcode | The client used an invalid Gateway opcode or sent a payload that does not match the opcode. | true |
| 4002 | Decode error | The client sent Discord a payload that is invalid. | true |
| 4003 | Not authenticated | A payload arrived before identification completed, or the session was invalidated. | true |
| 4004 | Authentication failed | The account token in the identify payload is wrong. | false |
| 4005 | Already authenticated | More than one identify payload was sent. | true |
| 4007 | Invalid `seq` | The resume sequence was invalid. Reconnect and open a new session. | true |
| 4008 | Rate limited | Payloads are being sent too quickly; slow down. Discord disconnects the client when this code is received. | true |
| 4009 | Session timed out | The session timed out. Reconnect and create a new session. | true |
| 4010 | Invalid shard | The identify payload used an invalid shard. | false |
| 4011 | Sharding required | The session would cover too many guilds, so the connection must be sharded before connecting. | false |
| 4012 | Invalid API version | The gateway version sent by the client is invalid. | false |
| 4013 | Invalid intent(s) | The Gateway Intent value was invalid; the bitwise value may have been calculated incorrectly. | false |
| 4014 | Disallowed intent(s) | The Gateway Intent value is not allowed, likely because the intent is not enabled or approved. | false |

