# Joining the mls group initial group
Context: Discord developer reference: Joining the mls group initial group
[Source](voice-handshake-and-encryption-index.md) / [Owning endpoint, event, object or procedure conditions](joining-the-mls-group.md) / [Previous source section](identity-public-key.md) / [Following source section](joining-the-mls-group-welcome.md)
<a id="source-initial-group"></a>

#### Initial Group

 If an MLS group has not been established yet, for example during an upgrade from transport-only encryption or at the start of a fresh two-person call, every pending member builds a local group using the DAVE protocol version parameters and the external sender received from [Opcode 25 DAVE MLS External Sender Package](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice). Any pending member may produce the first commit that creates the MLS group at `epoch = 1`. The voice gateway sends each pending member Add proposals for the other pending participants; if another participant arrives before the group exists, that participant also receives the in-flight proposals. Proposal and commit handling is the same whether a group already exists or not. See [Proposals and Commits](https://docs.discord.com/developers/topics/voice-connections#proposals-and-commits).

