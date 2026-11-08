# Accepting game invites
Context: Discord developer reference: Accepting game invites
[Source](managing-game-invites-index.md) / [Previous source section](receiving-game-invites-in-the-sdk.md) / [Following source section](using-game-invites-with-lobbies.md)
<a id="source-accepting-game-invites"></a>

### Accepting Game Invites

 Use [`Client::SetActivityJoinCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a587d1c6d0352eba397c888987aa58418) to detect invite acceptance from either the game or Discord. The callback provides the join secret, which your title can resolve into the correct session for both players.

```
// This fires when a user clicks "Join" on someone's Rich Presence
client->SetActivityJoinCallback([&client](std::string joinSecret) {
  // joinSecret is pulled from the host's Rich Presence ActivitySecrets
  // Use the joinSecret to connect the players in your game
});

```

---

