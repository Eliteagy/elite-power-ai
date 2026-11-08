# Identity public key
Context: Discord developer reference: Identity public key
[Source](voice-handshake-and-encryption-index.md) / [Owning endpoint, event, object or procedure conditions](joining-the-mls-group.md) / [Owning endpoint, event, object or procedure conditions](joining-the-mls-group-key-packages.md) / [Following source section](joining-the-mls-group-initial-group.md)
<a id="source-identity-public-key"></a>

##### Identity Public Key

 Each MLS participant signs and authenticates MLS messages with an asymmetric keypair. Its public key appears in both the key package and the MLS tree, is visible to other call participants, and can be used for out-of-band identity verification. You may generate a fresh ephemeral keypair for each protocol call or reuse one persistent keypair.

