# Proposals and commits
Context: Discord developer reference: Proposals and commits
[Source](voice-handshake-and-encryption-index.md) / [Previous source section](joining-the-mls-group-invalid-group.md) / [Following source section](audio-frame-e2-ee.md)
<a id="source-proposals-and-commits"></a>

### Proposals and Commits

 The voice gateway dispatches proposals through [Opcode 27 DAVE MLS Proposals](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice), and members must append or revoke them. All members of the established or pending MLS group append or revoke received proposals, then create an MLS commit and, when committing add proposals for new members, optionally an MLS welcome message. They send those messages to the voice gateway through [Opcode 28 DAVE MLS Commit Welcome](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice). For each epoch, the voice gateway dispatches the winning commit through [Opcode 29 DAVE MLS Announce Commit Transition](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) and may dispatch associated welcome messages through [Opcode 30 DAVE MLS Welcome](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice). The first valid commit and welcome(s) seen for that epoch are broadcast, while later commits for the stale epoch are dropped. A valid commit must include every unrevoked proposal dispatched in that epoch. A valid welcome must welcome every member added during the epoch.

