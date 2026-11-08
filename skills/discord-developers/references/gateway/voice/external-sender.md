# External sender
Context: Discord developer reference: External sender
[Source](voice-handshake-and-encryption-index.md) / [Previous source section](mls-group-changes.md) / [Following source section](joining-the-mls-group.md)
<a id="source-external-sender"></a>

### External Sender

 The voice gateway acts as the MLS group's external sender so it can submit MLS proposals for participant joins and leaves, such as adding a newly connected member or removing one that disconnected. DAVE protocol participants accept proposals only from that external sender, and the sender is limited to Add and Remove proposals. Through [Opcode 25 DAVE MLS External Sender Package](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice), the voice gateway delivers the sender credential and public key to MLS group participants. The package can arrive right after the voice gateway connects or later during an upgrade to DAVE protocol. Group creators include the gateway-provided external sender in the MLS group extensions, and welcomed members check that the expected extension is present before joining.

