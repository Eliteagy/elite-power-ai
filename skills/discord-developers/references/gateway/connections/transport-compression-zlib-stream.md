# Transport compression zlib stream
Context: Discord developer reference: Transport compression zlib stream
[Source](intents-members-and-sharding-index.md) / [Owning endpoint, event, object or procedure conditions](transport-compression.md) / [Following source section](transport-compression-zstd-stream.md)
<a id="source-zlib-stream"></a> <a id="source-transport-compression-example"></a>

#### zlib-stream

 With zlib transport compression, received data for a single Gateway connection must be processed through a shared zlib context. Each Gateway connection should still have its own unique zlib context. For transport-compressed data, append received data to a buffer until the 4-byte `Z_SYNC_FLUSH` suffix (`00 00 ff ff`) arrives. After the `Z_SYNC_FLUSH` marker is present, decompress the buffer.

###### Transport Compression Example

```
# Z_SYNC_FLUSH suffix
ZLIB_SUFFIX = b'\x00\x00\xff\xff'
# initialize a buffer to store chunks
buffer = bytearray()
# create a shared zlib inflation context to run chunks through
inflator = zlib.decompressobj()

# ...
def on_websocket_message(msg):
  # always push the message data to your cache
  buffer.extend(msg)

  # check if the last four bytes are equal to ZLIB_SUFFIX
  if len(msg) < 4 or msg[-4:] != ZLIB_SUFFIX:
    return

  # if the message *does* end with ZLIB_SUFFIX,
  # get the full message by decompressing the buffers
  # NOTE: the message is utf-8 encoded.
  msg = inflator.decompress(buffer)
  buffer = bytearray()

  # here you can treat `msg` as either JSON or ETF encoded,
  # depending on your `encoding` param

```

