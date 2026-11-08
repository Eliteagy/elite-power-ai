# Transport encryption modes
Context: Discord developer reference: Transport encryption modes
[Source](voice-transport-and-interpolation-index.md) / [Previous source section](transport-encryption-and-sending-voice.md) / [Following source section](speaking.md)
<a id="source-transport-encryption-modes"></a> <a id="source-example-session-description-payload"></a> <a id="source-voice-packet-structure"></a>

### Transport Encryption Modes

| Mode | Key | Nonce | Status |
| --- | --- | --- | --- |
| AEAD AES256-GCM (RTP Size) | aead_aes256_gcm_rtpsize | 32-bit incremental integer value, added to the end of the payload | Available (Preferred) |
| AEAD XChaCha20 Poly1305 (RTP Size) | aead_xchacha20_poly1305_rtpsize | 32-bit incremental integer value, added to the end of the payload | Available (Required) |
| XSalsa20 Poly1305 Lite (RTP Size) | xsalsa20_poly1305_lite_rtpsize | 32-bit incremental integer value, added to the end of the payload | Deprecated |
| AEAD AES256-GCM | aead_aes256_gcm | 32-bit incremental integer value, added to the end of the payload | Deprecated |
| XSalsa20 Poly1305 | xsalsa20_poly1305 | Copy of RTP header | Deprecated |
| XSalsa20 Poly1305 Suffix | xsalsa20_poly1305_suffix | 24 random bytes | Deprecated |
| XSalsa20 Poly1305 Lite | xsalsa20_poly1305_lite | 32-bit incremental integer value, added to the end of the payload | Deprecated |

 The deprecated encryption modes above stop being supported on November 18th, 2024. Starting on that date, the voice gateway rejects connections that choose one of those deprecated modes. Remove the nonce from the payload before both encryption and decryption of audio data. RTP size variants compute the unencrypted RTP header length [the same way as SRTP](https://tools.ietf.org/html/rfc3711#section-3.1), treating CSRCs and, when present, the extension preamble as part of that unencrypted header. Deprecated variants instead use a fixed unencrypted RTP header size. [Opcode 2 Ready](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) tells the client which encryption modes the voice gateway supports. Voice-gateway-compatible modes always contain `aead_xchacha20_poly1305_rtpsize`; `aead_aes256_gcm_rtpsize` may be absent depending on hardware. Clients must implement `aead_xchacha20_poly1305_rtpsize`, and should choose `aead_aes256_gcm_rtpsize` when Discord offers it. Send the chosen mode in [Opcode 1 Select Protocol](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice). The voice server then returns [Opcode 4 Session Description](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) with the `mode` and `secret_key`; `secret_key` is a 32 byte array for [transport encryption and sending](https://docs.discord.com/developers/topics/voice-connections#transport-encryption-and-sending-voice) voice data:

###### Example Session Description Payload

```
{
  "op": 4,
  "d": {
      "mode": "aead_aes256_gcm_rtpsize",
      "secret_key": [ ...251, 100, 11...],
      "dave_protocol_version": 1
  }
}

```

 At this point, the client can encrypt audio and send voice packets across the UDP connection that was already established.

###### Voice Packet Structure

| Field | Type | Size |
| --- | --- | --- |
| Version + Flags | Single byte value of `0x80` | 1 byte |
| Payload Type | Single byte value of `0x78` | 1 byte |
| Sequence | Unsigned short (big endian) | 2 bytes |
| Timestamp | Unsigned integer (big endian) | 4 bytes |
| SSRC | Unsigned integer (big endian) | 4 bytes |
| Encrypted audio | Binary data | n bytes |

