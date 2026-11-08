# Audio frame e2 ee payload format
Context: Discord developer reference: Audio frame e2 ee payload format
[Source](voice-handshake-and-encryption-index.md) / [Owning endpoint, event, object or procedure conditions](audio-frame-e2-ee.md) / [Previous source section](audio-frame-e2-ee-uleb128-encoding.md) / [Following source section](audio-frame-e2-ee-frame-encryption.md)
<a id="source-payload-format"></a>

#### Payload Format

| Field | Description | Size |
| --- | --- | --- |
| E2EE OPUS Frame | Ciphertext for the E2EE OPUS frame | Variable bytes |
| AES-GCM Auth. Tag | Truncated AES128-GCM AEAD Authentication Tag | 8 bytes |
| ULEB128 Nonce | ULEB128 synchronization nonce | Variable bytes |
| ULEB128 Unencrypted Ranges | ULEB128 offset/length pairs for unencrypted data in the E2EE frame | Variable bytes |
| Supplemental Data Size | Unsigned integer byte size for supplemental data | 1 byte |
| Magic Marker | 0xFAFA marker used to help identify protocol frames | 2 bytes |

 The E2EE OPUS frame contains the ciphertext output from the AES128-GCM AEAD process described below. The authentication tag stores the AEAD tag truncated to 8 bytes. The ULEB128 nonce encodes the encryption/decryption nonce as a compact variable-length value. For OPUS frames, the ULEB128 unencrypted ranges field has no contents (0 bytes), because the complete frame is encrypted. The supplemental data size is the total byte count needed for:
- 8-byte authentication tag
- Variable length ULEB128 nonce
- Variable length ULEB128 unencrypted ranges
- 1 byte supplemental data size
- 2 byte magic marker
 The magic marker is the constant 2-byte value 0xFAFA. Media receivers use it to detect protocol frames, and the SFU uses it to avoid forwarding protocol frames to receivers without protocol support during transition periods.

