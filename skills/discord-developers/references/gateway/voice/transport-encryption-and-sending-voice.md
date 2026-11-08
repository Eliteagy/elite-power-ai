# Transport encryption and sending voice
Context: Discord developer reference: Transport encryption and sending voice
[Source](voice-transport-and-interpolation-index.md) / [Previous source section](aead-additional-data.md) / [Following source section](transport-encryption-modes.md)
<a id="source-transport-encryption-and-sending-voice"></a>

### Transport Encryption and Sending Voice

 E2EE calls still keep transport encryption between the client and the selective forwarding unit (SFU). Audio sent to discord should be encoded as [Opus](https://www.opus-codec.org/) with stereo channels and a 48kHz sample rate. Voice Data uses a [RTP Header](https://www.rfcreader.com/#rfc3550_line548) followed by encrypted Opus audio data. For voice encryption, use the key from [Opcode 4 Session Description](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice); build the nonce from the 12 byte header plus 12 null bytes so it reaches the 24 bytes required by xsalsa20_poly1305. Discord performs encryption with the [libsodium](https://download.libsodium.org/doc/) encryption library.

