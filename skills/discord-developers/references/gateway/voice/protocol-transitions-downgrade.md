# Protocol transitions downgrade
Context: Discord developer reference: Protocol transitions downgrade
[Source](voice-handshake-and-encryption-index.md) / [Owning endpoint, event, object or procedure conditions](protocol-transitions.md) / [Following source section](protocol-version-change-upgrade.md)
<a id="source-downgrade"></a>

#### Downgrade

 Downgrades to protocol version 0 are announced with [Opcode 21 DAVE Protocol Prepare Transition](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice). This can happen during the transition phase when a client without protocol support joins the call. Once the transition executes, senders should stop sending media in the protocol format.

