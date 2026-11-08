# Sending game invites in the SDK
Context: Discord developer reference: Sending game invites in the SDK
[Source](managing-game-invites-index.md) / [Previous source section](sending-game-invites-in-the-discord-client.md) / [Following source section](receiving-game-invites.md)
<a id="source-sending-game-invites-in-the-sdk"></a>

### Sending Game Invites in the SDK

 When a player's rich presence includes the required party data, join secret, and supported platforms, your game can send invites through the SDK with [`Client::SendActivityInvite`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#afc14e98fc070399895739da6d53efa60). [`Client::SendActivityInvite`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#afc14e98fc070399895739da6d53efa60) requires active Rich Presence with the correct configuration. The invite and join behavior works with the [default presence scopes](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#default-presence-scopes), but the invite message, such as `"Join my game!"`, is a Discord message and requires communication scopes. If the sender only has presence scopes, the invite can still be sent and accepted, but the message body will be empty.

```
uint64_t targetUserId = 1111785262289277050;
std::string inviteMessage = "Join my game!";
client->SendActivityInvite(targetUserId, inviteMessage, [](discordpp::ClientResult result) {
  if(result.Successful()) {
    std::cout << "Activity Invite sent to user" << std::endl;
  } else {
    std::cerr << "Failed - check if Rich Presence has party, secret, and platforms set" << std::endl;
  }
});

```

 (Figure: Example of a sent game invite in the Discord client)

---

