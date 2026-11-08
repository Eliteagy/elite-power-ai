# Adding logging support
Context: Discord developer reference: Adding logging support
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](setting-up-sdk-event-handling.md) / [Following source section](monitoring-connection-status.md)
<a id="source-adding-logging-support"></a>

### Adding Logging Support

 Start by adding logging so SDK behavior is visible:

```
client->AddLogCallback([](auto message, auto severity) {
  std::cout << "[" << EnumToString(severity) << "] " << message << std::endl;
}, discordpp::LoggingSeverity::Info);

```

