# Mls group changes
Context: Discord developer reference: Mls group changes
[Source](voice-handshake-and-encryption-index.md) / [Owning endpoint, event, object or procedure conditions](protocol-transitions.md) / [Previous source section](protocol-version-change-upgrade.md) / [Following source section](external-sender.md)
<a id="source-mls-group-changes"></a>

#### MLS Group Changes

 When MLS group participants need to change, existing participants receive [Opcode 29 DAVE MLS Announce Commit Transition](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice), while new members being added receive [Opcode 30 DAVE MLS Welcome](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice). Both opcodes include the transition ID and a binary MLS Commit or MLS Welcome message. Existing group members prepare for the protocol transition by applying the commit and advancing their local MLS group to the correct next state. [Opcode 23 DAVE Protocol Transition Ready](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) is sent after the MLS commit is processed. Welcomed members send [Opcode 23 DAVE Protocol Transition Ready](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) after successfully joining the group from the MLS Welcome message.

