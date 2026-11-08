# Encoding and compression
Context: Discord developer reference: Encoding and compression
[Source](intents-members-and-sharding-index.md) / [Previous source section](rate-limiting.md) / [Following source section](using-json-encoding.md)
<a id="source-encoding-and-compression"></a>

### Encoding and Compression

 When [connecting](https://docs.discord.com/developers/events/gateway#connecting) to the Gateway, apps choose an `encoding` parameter for either plain-text JSON or binary [ETF](https://erlang.org/doc/apps/erts/erl_ext_dist.html). Use the encoding you prefer, but each has tradeoffs; JSON is generally recommended when you are unsure. Apps may enable compression to receive zlib-compressed or zstd-compressed packets. [Payload compression](https://docs.discord.com/developers/events/gateway#payload-compression) works only with JSON encoding, while [transport compression](https://docs.discord.com/developers/events/gateway#transport-compression) can be used with any encoding.

