# Voice End-to-End Encryption (DAVE Protocol)

Date: 2024-09-17
Categories: Voice
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2512) · [Year index](INDEX.md)

<a id="source-voice-end-to-end-encryption-dave-protocol"></a>


New [high-level documentation](https://docs.discord.com/developers/topics/voice-connections) explains the DAVE protocol for encrypted Discord voice/video sessions and the [new voice gateway opcodes](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) that implementations must handle.

<a id="source-developer-impact"></a>

### **Developer Impact**

Beginning in September 2024, Discord started rolling E2EE into DM calls, Group DM calls, voice-channel sessions, and Go Live streams. **Who this affects:** Libraries or apps that implement [Voice Connections](https://docs.discord.com/developers/topics/voice-connections). Immediate E2EE support is not required because calls automatically upgrade or downgrade according to the clients present in the call.

<a id="source-implementing-e2ee-voice"></a>

### **Implementing E2EE Voice**

The new voice documentation gives an overview of DAVE and the voice gateway opcodes that DAVE-capable clients need. The most complete DAVE protocol details are in the [Protocol Whitepaper](https://daveprotocol.com/). The open-source [libdave](https://github.com/discord/libdave) library can help implementation. The [Voice Gateway Opcodes section of the protocol whitepaper](https://daveprotocol.com/#voice-gateway-opcodes) defines the exact DAVE protocol opcode format.

<a id="source-future-deprecation-and-discontinuation-of-non-e2ee-voice"></a>

### **Future Deprecation and Discontinuation of Non-E2EE Voice**

Discord plans to remove non-E2EE support for those DM, Group DM, voice-channel, and Go Live voice paths after a transition period. During 2025, official Discord clients are expected to support DAVE, after which eligible audio/video session types will require it. Once Discord finalizes the deprecation and discontinuation timeline, developers will have **at least six months** to implement before non-E2EE voice connections are sunset. Additional material on DAVE is available here:
- [Meet DAVE: Discord's New End-to-End Encryption for Audio & Video](https://discord.com/blog/meet-dave-e2ee-for-audio-video)
- [DAVE Protocol Whitepaper](https://daveprotocol.com/)
- [libdave open-source library on GitHub](https://github.com/discord/libdave)
