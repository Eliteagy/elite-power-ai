# Client side lobby management
Context: Discord developer reference: Client side lobby management
[Source](managing-lobbies-index.md) / [Previous source section](server-side-lobby-management.md) / [Following source section](leaving-a-lobby.md)
<a id="source-client-side-lobby-management"></a>

### Client-Side Lobby Management

 The SDK client can create and join lobbies by using a secret associated with the lobby. Share that secret with the users who should be able to join. If no lobby exists for the secret, one is created when the client joins.
- The main SDK functions are [`Client::CreateOrJoinLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8b4e195555ecaa89ccdfc0acd28d3512) and [`Client::LeaveLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8c78f797240b35d721383461a2e62926).
- Lobby secrets are unique per game, meaning per application. For a new lobby after a match ends, use a different secret. Calling [`Client::LeaveLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8c78f797240b35d721383461a2e62926) and then [`Client::CreateOrJoinLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8b4e195555ecaa89ccdfc0acd28d3512) with the same secret will add the user back to that same lobby.
- If the user is already in the lobby, calling [`Client::CreateOrJoinLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8b4e195555ecaa89ccdfc0acd28d3512) updates that user's metadata when metadata is supplied.
- Discord Rich Presence can sync the same secret. With that flow, clients may ask to join another user's activity. After approval, the SDK receives the secret, allowing the game to join the related lobby if desired. See the [Game Invites for Lobbies](https://docs.discord.com/developers/discord-social-sdk/development-guides/managing-lobbies#creating-lobby-invites) example below.
- To track metadata for a lobby or its members, call [`Client::CreateOrJoinLobbyWithMetadata`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a5c84fa76c73cf3c0bfd68794ca5595c1). It accepts a JSON object that is stored on the lobby and lobby members. Retrieve that metadata through the discordpp::Client::GetLobbyHandle function.

```
// Create or join a lobby from the client
client->CreateOrJoinLobby("your-unique-lobby-secret",[client](discordpp::ClientResult result, uint64_t lobbyId) {
  if(result.Successful()) {
    std::cout << "🎮 Lobby created or joined successfully! Lobby Id: " << lobbyId << std::endl;
  } else {
    std::cerr << "❌ Lobby creation/join failed\n";
  }
});

```

