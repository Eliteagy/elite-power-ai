# End to end encryption dave protocol
Context: Discord developer reference: End to end encryption dave protocol
[Source](voice-handshake-and-encryption-index.md) / [Previous source section](establishing-a-voice-udp-connection.md) / [Following source section](binary-websocket-messages.md)
<a id="source-end-to-end-encryption-dave-protocol"></a>

### End-to-End Encryption (DAVE Protocol)

 Since September 2024, Discord has been rolling end-to-end encryption (E2EE) into DM calls, Group DM calls, voice-channel conversations, and Go Live sessions. To meet long-term privacy goals, Discord will require E2EE after **March 1st, 2026** anywhere Discord carries audio or video in DMs, GDMs, voice channels, or Go Live streams.

 Implement DAVE support as early as possible for a smoother migration. This section gives a high-level view of Discord's audio & video end-to-end encryption (DAVE) protocol, focused on the voice gateway opcodes needed by the protocol. The most complete DAVE protocol documentation is the [Protocol Whitepaper](https://daveprotocol.com). The open-source [libdave](https://github.com/discord/libdave) library may also help with implementation. The exact DAVE protocol opcode format is covered in the [Voice Gateway Opcodes section of the protocol whitepaper](https://daveprotocol.com/#voice-gateway-opcodes). In an E2EE call, every member exchanges keys through a [Messaging Layer Security](https://www.rfc-editor.org/rfc/rfc9420.html) (MLS) group. That group derives per-sender ratcheted media keys, known only to group participants, for encrypting and decrypting media frames in the call.

