# Excluding krisp to reduce installation size
Context: Discord developer reference: Excluding krisp to reduce installation size
[Source](managing-voice-chat-index.md) / [Previous source section](advanced-noise-cancellation-krisp.md) / [Following source section](manipulating-voice-data-with-callbacks.md)
<a id="source-excluding-krisp-to-reduce-installation-size"></a>

### Excluding Krisp to Reduce Installation Size

 Krisp is distributed as extra libraries and model files next to the core SDK, which increases the installed footprint. If reducing size matters, for example on mobile, omit Krisp and keep WebRTC noise suppression. To exclude Krisp, remove all `.kef` and `.kw` files, plus any file or directory whose name includes `krisp`, such as `discord_krisp.dll`, `libdiscord_krisp.dylib`, `discord_partner_sdk_krisp.aar`, and `discord_partner_sdk_krisp.xcframework`.

