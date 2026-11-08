# Joining the mls group key packages
Context: Discord developer reference: Joining the mls group key packages
[Source](voice-handshake-and-encryption-index.md) / [Owning endpoint, event, object or procedure conditions](joining-the-mls-group.md) / [Following source section](identity-public-key.md)
<a id="source-key-packages"></a>

#### Key Packages

 Pending members send an MLS key package through [Opcode 26 DAVE MLS Key Package](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) so they can be proposed for addition to the MLS group. Key packages are single-use, and each time a pending member waits to be added or re-added to the group, a new key package must be generated.

