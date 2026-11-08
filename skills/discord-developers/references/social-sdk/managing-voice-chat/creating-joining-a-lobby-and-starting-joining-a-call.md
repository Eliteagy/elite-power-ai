# Creating joining a lobby and starting joining a call
Context: Discord developer reference: Creating joining a lobby and starting joining a call
[Source](managing-voice-chat-index.md) / [Previous source section](starting-and-joining-voice-calls.md) / [Following source section](how-it-works.md)
<a id="source-creatingjoining-a-lobby-and-startingjoining-a-call"></a>

### Creating/Joining a Lobby and Starting/Joining a Call

 The following end-to-end sample joins a lobby and begins a voice call:

```
// First, create or join a lobby using a shared secret
const std::string lobbySecret = "my-game-lobby-secret";

client->CreateOrJoinLobby(lobbySecret, [client](const discordpp::ClientResult& result, uint64_t lobbyId) {
    if (result.Successful()) {
        std::cout << "🎮 Successfully joined lobby!" << std::endl;

        // Now start or join the voice call in this lobby
        // StartCall returns a Call object but has no callback
        const auto call = client->StartCall(lobbyId);

        // StartCall returns null if user is already in this voice channel
        if (call) {
          std::cout << "🎤 Voice call operation initiated..." << std::endl;
        } else {
          std::cout << "ℹ️ Already in this voice channel" << std::endl;
        }

    } else {
        std::cerr << "❌ Failed to join lobby: " << result.Error() << std::endl;
    }
});

```

