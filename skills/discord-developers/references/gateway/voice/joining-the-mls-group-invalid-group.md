# Joining the mls group invalid group
Context: Discord developer reference: Joining the mls group invalid group
[Source](voice-handshake-and-encryption-index.md) / [Owning endpoint, event, object or procedure conditions](joining-the-mls-group.md) / [Previous source section](joining-the-mls-group-welcome.md) / [Following source section](proposals-and-commits.md)
<a id="source-invalid-group"></a>

#### Invalid Group

 If the group from [Opcode 30 DAVE MLS Welcome](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) or [Opcode 29 DAVE MLS Announce Commit Transition](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) cannot be processed, the receiving member sends [Opcode 31 DAVE MLS Invalid Commit Welcome](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) to the voice gateway. The member also resets local group state, creates a new key package, and sends it to the voice gateway via [Opcode 26 DAVE MLS Key Package](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice). That causes the voice gateway to propose removing and re-adding the requesting member.

