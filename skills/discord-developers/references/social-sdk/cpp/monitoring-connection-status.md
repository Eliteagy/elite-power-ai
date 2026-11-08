# Monitoring connection status
Context: Discord developer reference: Monitoring connection status
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](adding-logging-support.md) / [Following source section](what-these-callbacks-do.md)
<a id="source-monitoring-connection-status"></a>

### Monitoring Connection Status

 Then add a status callback so the program knows when Discord features can be used:

```
client->SetStatusChangedCallback([client](discordpp::Client::Status status, discordpp::Client::Error error, int32_t errorDetail) {
  std::cout << "🔄 Status changed: " << discordpp::Client::StatusToString(status) << std::endl;

  if (status == discordpp::Client::Status::Ready) {
    std::cout << "✅ Client is ready! You can now call SDK functions.\n";
  } else if (error != discordpp::Client::Error::None) {
    std::cerr << "❌ Connection Error: " << discordpp::Client::ErrorToString(error) << " - Details: " << errorDetail << std::endl;
  }
});

```

main.cpp with event handling

The complete program is in the [upstream source](https://raw.githubusercontent.com/discord/discord-api-docs/aaef8ae4c3398fcdabeec0d1dd5a3e69be587ad8/developers/discord-social-sdk/getting-started/using-c%2B%2B.mdx).

 Most Discord features are unavailable until the status reaches [`Client::Status::Ready`]. The status callback tells you when that point is reached.

