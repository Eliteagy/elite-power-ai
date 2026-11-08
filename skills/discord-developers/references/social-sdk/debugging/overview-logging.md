# Overview logging
Context: Discord developer reference: Overview logging
[Source](logging-api-and-unicode-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](overview-debugging.md) / [Following source section](overview-voice-logging.md)
<a id="source-logging"></a>

### Logging

 Read SDK log output through [`Client::AddLogCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#af78996cff24a40f5dc7066beed16692c). If you configure [`Client::SetLogDir`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a23bd5802dfa3072201ea864ee839c001), the SDK writes logs into that directory. Production builds should generally use `ERROR (4)` or `WARN (3)`. During development, `INFO (2)` and `VERBOSE (1)` provide more detailed diagnostics.

```
client->AddLogCallback([](auto message, auto severity) {
  std::cout << "[" << EnumToString(severity) << "] " << message << std::endl;
}, discordpp::LoggingSeverity::Info);

```

