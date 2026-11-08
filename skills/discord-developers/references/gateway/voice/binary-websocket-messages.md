# Binary websocket messages
Context: Discord developer reference: Binary websocket messages
[Source](voice-handshake-and-encryption-index.md) / [Previous source section](end-to-end-encryption-dave-protocol.md) / [Following source section](indicating-dave-protocol-support.md)
<a id="source-binary-websocket-messages"></a>

### Binary Websocket Messages

 Some new DAVE protocol opcodes are binary rather than JSON text to reduce overhead. Use the binary column in the [Voice Opcodes Table](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) to identify them. Binary websocket messages use this layout:
| Field | Description | Size |
| --- | --- | --- |
| Sequence Number | OPTIONAL server -> client big-endian uint16 sequence number | 2 bytes |
| Opcode | Unsigned integer opcode value | 1 bytes |
| Payload | Binary payload for the message, with format determined by opcode | Variable bytes |

 Only server-to-client binary messages include sequence numbers, and every server-sent binary opcode requires that number. See [Resuming Voice Connection](https://docs.discord.com/developers/topics/voice-connections#resuming-voice-connection) for how sequence numbers are used when present.

