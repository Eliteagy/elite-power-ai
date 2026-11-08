# Voice gateway versioning
Context: Discord developer reference: Voice gateway versioning
[Source](voice-handshake-and-encryption-index.md) / [Previous source section](voice-connections.md) / [Following source section](retrieving-voice-server-information.md)
<a id="source-voice-gateway-versioning"></a> <a id="source-gateway-versions"></a>

### Voice Gateway Versioning

 Use [version 8](https://docs.discord.com/developers/topics/voice-connections#voice-gateway-versioning-gateway-versions) for current behavior. Without it, the documented [Opcodes](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) may not match what arrives over the socket. The voice gateway previously defaulted to version 1 when the `v` query string was omitted. That fallback is deprecated; future connections must provide a voice gateway version or they will be rejected. Versions below 4 and the default-version fallback will be discontinued on November 18th, 2024. From that date, connections with no version or a version lower than version 4 will be rejected.

###### Gateway Versions

| Version | Status | WebSocket URL Append | Change |
| --- | --- | --- | --- |
| 8 | recommended | ?v=8 | Added buffering for server messages, with missed messages delivered again during resume |
| 7 | available | ?v=7 | Added channel options opcode |
| 6 | available | ?v=6 | Added code version opcode |
| 5 | available | ?v=5 | Added video sink wants opcode |
| 4 | available | ?v=4 | Changed speaking status from boolean to bitmask |
| 3 | deprecated | ?v=3 | Added video |
| 2 | deprecated | ?v=2 | Changed the server heartbeat reply to the heartbeat ACK opcode |
| 1 | deprecated | ?v=1 | Initial version |

