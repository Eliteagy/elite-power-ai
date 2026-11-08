# Overview voice logging
Context: Discord developer reference: Overview voice logging
[Source](logging-api-and-unicode-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](overview-logging.md) / [Following source section](overview-audio-logging.md)
<a id="source-voice-logging"></a>

### Voice Logging

 Voice has a separate log stream for the voice subsystem and the WebRTC layer. You can capture it in two ways:
- [`Client::SetVoiceLogDir`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a48c6b7e8bbc2b632a935acafc6a5f7a7) - stores voice logs on disk under the directory you provide.
- [`Client::AddVoiceLogCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ac4f9b459f853ef7270d1bfc12509ede5) - sends voice log entries to an application callback.
 You may use both APIs together. Call [`Client::SetVoiceLogDir`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a48c6b7e8bbc2b632a935acafc6a5f7a7) immediately after constructing Client and before anything that starts the voice subsystem, including [`Client::AddVoiceLogCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ac4f9b459f853ef7270d1bfc12509ede5). After voice initialization, setting the directory will not change logging behavior.

```
// Must be called right after constructing the client, before anything else
client->SetVoiceLogDir("/path/to/log/dir", discordpp::LoggingSeverity::Info);

// Can be called any time after construction
client->AddVoiceLogCallback([](auto message, auto severity) {
  std::cout << "[Voice][" << EnumToString(severity) << "] " << message << std::endl;
}, discordpp::LoggingSeverity::Info);

```

 Voice and WebRTC logs are produced separately from the primary SDK logs exposed through [`Client::AddLogCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#af78996cff24a40f5dc7066beed16692c). When troubleshooting voice or call-quality behavior, turn on voice logging as well as the main SDK callback.

