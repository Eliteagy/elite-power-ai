# Transport compression zstd stream
Context: Discord developer reference: Transport compression zstd stream
[Source](intents-members-and-sharding-index.md) / [Owning endpoint, event, object or procedure conditions](transport-compression.md) / [Previous source section](transport-compression-zlib-stream.md) / [Following source section](tracking-state.md)
<a id="source-zstd-stream"></a>

#### zstd-stream

 With zstd-stream transport compression, all received data must pass through a zstd decompression context that lives for the entire Gateway connection. Each websocket message maps to one Gateway message, but it does not close a zstd frame. Call ZSTD_decompressStream repeatedly until the frame data is processed; ZSTD_decompressStream does not always return 0. This [Erlang](https://github.com/silviucpp/ezstd/blob/f3f33b2f6b917f7e8aaa2b4d71338620537df81b/src/ezstd.erl#L151-L169) + [C++](https://github.com/silviucpp/ezstd/blob/f3f33b2f6b917f7e8aaa2b4d71338620537df81b/c_src/ezstd_nif.cc#L520-L568) implementation is a useful example.

