# Protocol version change upgrade
Context: Discord developer reference: Protocol version change upgrade
[Source](voice-handshake-and-encryption-index.md) / [Owning endpoint, event, object or procedure conditions](protocol-transitions.md) / [Previous source section](protocol-transitions-downgrade.md) / [Following source section](mls-group-changes.md)
<a id="source-protocol-version-change--upgrade"></a>

#### Protocol Version Change & Upgrade

 Protocol version transitions, including upgrades from protocol version 0, are announced through [Opcode 24 DAVE Protocol Prepare Epoch](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice). Along with `transition_id`, this opcode provides the `epoch` for the upcoming MLS epoch. Receiving [Opcode 24 DAVE Protocol Prepare Epoch](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) with `epoch = 1` means a new MLS group is being created. Participants must:
- prepare a local MLS group using parameters that match the DAVE protocol version
- generate and send [Opcode 26 DAVE MLS Key Package](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) so the voice gateway receives a new MLS key package
 When `epoch` is greater than 1, the existing MLS group is changing protocol version. After the transition executes, senders must send media with the new protocol context, such as the new protocol-version format or a new key ratchet.

