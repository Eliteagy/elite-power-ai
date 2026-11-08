# Frame encryption nonce
Context: Discord developer reference: Frame encryption nonce
[Source](voice-handshake-and-encryption-index.md) / [Owning endpoint, event, object or procedure conditions](audio-frame-e2-ee.md) / [Owning endpoint, event, object or procedure conditions](audio-frame-e2-ee-frame-encryption.md) / [Previous source section](sender-key-derivation.md)
<a id="source-nonce"></a>

##### Nonce

 AES128-GCM encryption and decryption receive a full 12-byte nonce, but the protocol uses no more than 4-bytes. Expand a 4-byte truncated nonce into 12 bytes by setting the 8 most significant bytes to zero and storing the truncated nonce value in the 4 least significant bytes. The sender key ratchet generation comes from the most-significant byte of the 4-byte nonce, which is the 4th least significant byte of the full 12-byte nonce.
