# Receiving game invites in the SDK
Context: Discord developer reference: Receiving game invites in the SDK
[Source](managing-game-invites-index.md) / [Previous source section](receiving-game-invites-in-the-discord-client.md) / [Following source section](accepting-game-invites.md)
<a id="source-receiving-game-invites-in-the-sdk"></a>

### Receiving Game Invites in the SDK

 Use [`Client::SetActivityInviteCreatedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a3b4e37a222a8662506d763514774bedc) to listen for new invites, and call [`Client::AcceptActivityInvite`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ad12cf35065e4d2b303ee470af7c6ef37) to accept one. The callback passed to [`Client::AcceptActivityInvite`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ad12cf35065e4d2b303ee470af7c6ef37) receives the join secret that was set in Rich Presence.

```
client->SetActivityInviteCreatedCallback([&client](discordpp::ActivityInvite invite) {
  std::cout << "Activity Invite received from user: " << invite.SenderId() << std::endl;
  if(auto message = client->GetMessageHandle(invite.MessageId())){
    std::cout << "Invite Message: " << message->Content() << std::endl;
  }
  client->AcceptActivityInvite(invite, [](discordpp::ClientResult result, std::string joinSecret) {
    if(result.Successful()) {
      std::cout << "Activity Invite accepted successfully!\n";
      // joinSecret comes from the sender's Rich Presence configuration
      // Use the joinSecret to connect the two players in your game
    } else {
      std::cerr << "❌ Activity Invite accept failed";
    }
  });
});

```

---

