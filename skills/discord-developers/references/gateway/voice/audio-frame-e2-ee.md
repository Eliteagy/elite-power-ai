# Audio frame e2 ee
Context: Discord developer reference: Audio frame e2 ee
[Source](voice-handshake-and-encryption-index.md) / [Previous source section](proposals-and-commits.md) / [Following source section](audio-frame-e2-ee-uleb128-encoding.md)
<a id="source-audio-frame-e2ee"></a>

### Audio Frame E2EE

 Transport encryption works at the packet level, while DAVE protocol E2EE works at the frame level. When a call enables any DAVE protocol, call participants send and receive OPUS frames whose full contents are end-to-end encrypted.

