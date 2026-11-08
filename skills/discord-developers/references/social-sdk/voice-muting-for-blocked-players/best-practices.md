# Best practices
Context: Discord developer reference: Best practices
[Source](voice-muting-for-blocked-players-index.md) / [Previous source section](handling-participants-who-join-later.md) / [Following source section](managing-voice-chat.md)
<a id="source-best-practices"></a>

### Best Practices

- **Consider filtering at matchmaking time.** The best user experience is to keep blocked players out of the same lobby. Voice muting covers audio, but the players may still appear to each other in game UI.
- **Update mutes when relationships change.** If a player blocks someone while a session is active, immediately call [`Call::SetLocalMute`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Call.html#aaf8e7728b15da5d1be8d8b4258225171) and refresh the `mute_list` member metadata by invoking [`Client::CreateOrJoinLobbyWithMetadata`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a5c84fa76c73cf3c0bfd68794ca5595c1) again with the updated list. In the server-side model, update that member through [`PUT /lobbies/{lobby.id}/members/{user.id}`](https://docs.discord.com/developers/resources/lobby#add-a-member-to-a-lobby).
- **Keep metadata compact.** Lobby member metadata is limited to 1,000 characters, so comma-separated ID strings are preferable to JSON objects.

---

