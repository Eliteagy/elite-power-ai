# Global voice controls
Context: Discord developer reference: Global voice controls
[Source](managing-voice-chat-index.md) / [Previous source section](controlling-voice-features.md) / [Following source section](per-call-voice-controls.md)
<a id="source-global-voice-controls"></a>

### Global Voice Controls

 The following methods apply voice settings across all active calls through the [`Client`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a91716140c699d8ef0bdf6bfd7ee0ae13) object:
- [`Client::SetSelfMuteAll`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a9c6ef96590533d103a866cb8a99d2669) - Turns off your microphone in every current call
- [`Client::SetSelfDeafAll`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a59be56ae5752e9f2f0f299bc552282b2) - Deafens you in all active calls
- [`Client::SetInputVolume`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ad4358f5baffd9a5f2a6fa74d62459313) - Changes microphone volume
- [`Client::SetOutputVolume`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a61a9321a79479c8b1be1559e2bbdd934) - Changes speaker volume

