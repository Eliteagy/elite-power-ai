# Sending messages to a lobby
Context: Discord developer reference: Sending messages to a lobby
[Source](managing-lobbies-index.md) / [Previous source section](lobby-lifecycle.md) / [Following source section](receiving-lobby-messages.md)
<a id="source-sending-messages-to-a-lobby"></a>

### Sending Messages to a Lobby

 After a lobby exists, its members can send messages with [`Client::SendLobbyMessage`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a779e0483f51dc99f0db3dd761d22ab6f). A client may message any lobby it belongs to, regardless of whether the lobby was joined through client-side or server-side creation.

```
uint64_t lobbyId = 1234567890;

client->SendLobbyMessage(lobbyId, "Hello", [](discordpp::ClientResult result, uint64_t messageId) {
  if(result.Successful()) {
    std::cout << "📨 Message sent successfully!\n";
  } else {
    std::cerr << "❌ Message sending failed\n";
  }
});

```

---

