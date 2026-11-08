# Voice
Context: Discord developer reference: Voice
[Source](gateway-http-and-api-status-index.md) / [Previous source section](gateway.md) / [Following source section](http.md)
<a id="source-voice"></a> <a id="source-voice-opcodes"></a> <a id="source-voice-close-event-codes"></a>

### Voice

 Voice gateways use separate opcodes and close codes.

###### Voice Opcodes

| Code | Name | Sent By | Description | Binary |
| --- | --- | --- | --- | --- |
| 0 | Identify | client | Begin a voice websocket connection. |  |
| 1 | Select Protocol | client | Select the voice protocol. |  |
| 2 | Ready | server | Complete the websocket handshake. |  |
| 3 | Heartbeat | client | Keep the websocket connection alive. |  |
| 4 | Session Description | server | Describe the session. |  |
| 5 | Speaking | client and server | Indicate which users are speaking. |  |
| 6 | Heartbeat ACK | server | Acknowledges a client heartbeat that was received. |  |
| 7 | Resume | client | Resume a connection. |  |
| 8 | Hello | server | Heartbeat delay, in milliseconds. |  |
| 9 | Resumed | server | Acknowledge a successful session resume. |  |
| 11 | Clients Connect | server | One or more clients joined the voice channel. |  |
| 13 | Client Disconnect | server | A client left the voice channel. |  |
| 21 | DAVE Prepare Transition | server | A DAVE protocol downgrade is scheduled. |  |
| 22 | DAVE Execute Transition | server | Run the protocol transition that was previously announced. |  |
| 23 | DAVE Transition Ready | client | Acknowledge readiness previously announced transition |  |
| 24 | DAVE Prepare Epoch | server | A DAVE protocol version or group change is pending. |  |
| 25 | DAVE MLS External Sender | server | MLS external sender credential and public key. | X |
| 26 | DAVE MLS Key Package | client | MLS Key Package for a pending group member. | X |
| 27 | DAVE MLS Proposals | server | MLS Proposals queued for append or revocation. | X |
| 28 | DAVE MLS Commit Welcome | client | MLS Commit plus optional MLS Welcome messages. | X |
| 29 | DAVE MLS Announce Commit Transition | server | MLS Commit to process for the upcoming transition. | X |
| 30 | DAVE MLS Welcome | server | MLS Welcome for the group used in the upcoming transition. | X |
| 31 | DAVE MLS Invalid Commit Welcome | client | Report an invalid commit or welcome and request re-add. |  |

###### Voice Close Event Codes

| Code | Description | Explanation |
| --- | --- | --- |
| 4001 | Unknown opcode | You sent an invalid opcode. |
| 4002 | Failed to decode payload | The identify payload sent to the Gateway was invalid. |
| 4003 | Not authenticated | A payload was sent before Gateway identification. |
| 4004 | Authentication failed | The token in the identify payload is wrong. |
| 4005 | Already authenticated | More than one identify payload was sent. |
| 4006 | Session no longer valid | The session is no longer valid. |
| 4009 | Session timeout | Your session has timed out. |
| 4011 | Server not found | Discord cannot find the server being joined. |
| 4012 | Unknown protocol | Discord did not recognize the submitted protocol. |
| 4014 | Disconnected | Disconnects one client, such as after a kick or main gateway session drop. Do not reconnect. |
| 4015 | Voice server crashed | The server crashed. Try resuming. |
| 4016 | Unknown encryption mode | Discord did not recognize the encryption value. |
| 4017 | E2EE/DAVE protocol required | The channel requires a client with E2EE support through the DAVE Protocol. |
| 4020 | Bad request | You sent a malformed request |
| 4021 | Disconnected: Rate Limited | Disconnect caused by exceeding a rate limit. Do not reconnect. |
| 4022 | Disconnected: Call Terminated | Disconnects all clients because the call ended, such as after channel deletion or a voice server change. Do not reconnect. |

