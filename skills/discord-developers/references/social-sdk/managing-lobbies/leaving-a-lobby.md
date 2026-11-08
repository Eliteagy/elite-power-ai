# Leaving a lobby
Context: Discord developer reference: Leaving a lobby
[Source](managing-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](client-side-lobby-management.md) / [Following source section](lobby-lifecycle.md)
<a id="source-leaving-a-lobby"></a>

#### Leaving a Lobby

 Remove a user from a lobby with [`Client::LeaveLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8c78f797240b35d721383461a2e62926). Only lobbies created by [`Client::CreateOrJoinLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8b4e195555ecaa89ccdfc0acd28d3512) can be left using [`Client::LeaveLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8c78f797240b35d721383461a2e62926).

```
uint64_t lobbyId = 1234567890;

// Leaving a lobby from the client
client->LeaveLobby(lobbyId, [lobbyId](discordpp::ClientResult result) {
  if(result.Successful()) {
    std::cout << "🎮 Left lobby successfully! Lobby Id: " << lobbyId << std::endl;
  } else {
    std::cerr << "❌ Leaving lobby failed\n";
  }
});

```

