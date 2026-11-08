# Indicating dave protocol support
Context: Discord developer reference: Indicating dave protocol support
[Source](voice-handshake-and-encryption-index.md) / [Previous source section](binary-websocket-messages.md) / [Following source section](protocol-transitions.md)
<a id="source-indicating-dave-protocol-support"></a>

### Indicating DAVE Protocol Support

 In [Opcode 0 Identify](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice), include the highest DAVE protocol version you support as `max_dave_protocol_version`. Sending version 0 or omitting `max_dave_protocol_version` indicates no DAVE protocol support. The voice gateway reports the starting protocol version in [Opcode 4 Session Description](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) as `dave_protocol_version`. It may choose any non-discontinued protocol version at or below the supported version. Clients must remain backwards-compatible with any non-discontinued DAVE protocol version. The voice gateway chooses the lowest protocol version shared by the call.

