# Using JSON encoding payload compression
Context: Discord developer reference: Using JSON encoding payload compression
[Source](intents-members-and-sharding-index.md) / [Owning endpoint, event, object or procedure conditions](using-json-encoding.md) / [Following source section](using-etf-encoding.md)
<a id="source-payload-compression"></a>

#### Payload Compression

 An app using payload compression cannot use [transport compression](https://docs.discord.com/developers/events/gateway#transport-compression). Payload compression optionally compresses some event packets sent by Discord over the connection. Compressed payloads use the zlib format described in [RFC1950 2.2](https://tools.ietf.org/html/rfc1950#section-2.2). To enable it, set `compress` to `true` in an [Identify (opcode `2`)](https://docs.discord.com/developers/events/gateway-events#identify) event. Not every payload is compressed after enabling this setting. The app or library *must* detect compressed payloads and decompress them to plain-text JSON before parsing. Payload compression does not use a shared compression context between events. It is disabled when [transport compression](https://docs.discord.com/developers/events/gateway#transport-compression) is used.

