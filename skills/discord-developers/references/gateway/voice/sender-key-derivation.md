# Sender key derivation
Context: Discord developer reference: Sender key derivation
[Source](voice-handshake-and-encryption-index.md) / [Owning endpoint, event, object or procedure conditions](audio-frame-e2-ee.md) / [Owning endpoint, event, object or procedure conditions](audio-frame-e2-ee-frame-encryption.md) / [Following source section](frame-encryption-nonce.md)
<a id="source-sender-key-derivation"></a>

##### Sender Key Derivation

 Every media sender has a ratcheted per-sender key, with a new ratchet for each MLS group epoch. The sender ratchet starts from a 16-byte secret exported by the MLS group. Key lookup uses a generation counter calculated from the high byte of the 4-byte nonce. For very long lived epochs, implementations must handle nonce wrap-around without allowing the generation to return to 0. See the [Sender Key Derivation section of the Protocol Whitepaper](https://daveprotocol.com/#sender-key-derivation) for the full process.

