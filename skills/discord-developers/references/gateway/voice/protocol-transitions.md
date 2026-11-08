# Protocol transitions
Context: Discord developer reference: Protocol transitions
[Source](voice-handshake-and-encryption-index.md) / [Previous source section](indicating-dave-protocol-support.md) / [Following source section](protocol-transitions-downgrade.md)
<a id="source-protocol-transitions"></a>

### Protocol Transitions

 The voice gateway coordinates protocol version changes and MLS group transitions so media continuity is preserved during the call. This can happen when a call moves to or from E2EE during the initial transition phase, changes protocol version, or changes MLS group membership. Some opcodes carry a transition ID. After preparing the local state needed for the transition, send [Opcode 23 DAVE Protocol Transition Ready](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) to tell the voice gateway you are ready to execute it. When every participant is ready or a timeout occurs, the voice gateway sends [Opcode 22 DAVE Protocol Execute Transition](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) to confirm execution. Execution tells media senders to begin using the new protocol context, such as no E2EE after downgrade, a new protocol version after a version change, or a new key ratchet after a participant change.

