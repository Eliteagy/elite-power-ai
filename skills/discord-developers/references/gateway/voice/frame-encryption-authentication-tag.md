# Frame encryption authentication tag
Context: Discord developer reference: Frame encryption authentication tag
[Source](voice-transport-and-interpolation-index.md) / [Owning endpoint, event, object or procedure conditions](audio-frame-e2-ee.md) / [Owning endpoint, event, object or procedure conditions](audio-frame-e2-ee-frame-encryption.md) / [Following source section](aead-additional-data.md)
<a id="source-voice-connections-part-2"></a> <a id="source-authentication-tag"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

##### Authentication Tag

 AES128-GCM encryption produces an authentication tag that is shortened to 8 bytes. Libraries differ: some let callers request that tag size directly, while others return a 12-byte tag and require dropping the 4 least-significant bytes.

