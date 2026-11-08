# Voice connections
Context: Discord developer reference: Voice connections
[Source](voice-handshake-and-encryption-index.md) / [Following source section](voice-gateway-versioning.md)
<a id="source-voice-connections-part-1"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

Voice connections resemble a [Gateway](https://docs.discord.com/developers/events/gateway) connection, but they use their own payload set plus a separate UDP connection for carrying voice data. Since UDP handles both inbound and outbound voice traffic, the client *must* be able to receive UDP packets through any firewall or NAT; see [UDP Hole Punching](https://en.wikipedia.org/wiki/UDP_hole_punching). Discord Voice servers include [IP Discovery](https://docs.discord.com/developers/topics/voice-connections#ip-discovery), which can determine the local machine's remote UDP IP/Port and help with some network setups.

