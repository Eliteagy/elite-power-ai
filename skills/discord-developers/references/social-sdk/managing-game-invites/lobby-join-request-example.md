# Lobby join request example
Context: Discord developer reference: Lobby join request example
[Source](managing-game-invites-index.md) / [Previous source section](game-invite-with-lobby-example.md) / [Following source section](supporting-mobile-game-invites.md)
<a id="source-lobby-join-request-example"></a>

### Lobby Join Request Example

 Users can request access to each other's parties too. This code sample demonstrates that path:

```
// User A
// 1. Create a lobby with secret
std::string lobbySecret = "foo";
uint64_t USER_A_ID = 286438705638408203;
client->CreateOrJoinLobby(lobbySecret, [&client](discordpp::ClientResult result, uint64_t lobbyId) {
  // 2. Update Rich Presence with a party and join secret to enable invites
  discordpp::Activity activity{};
  activity.SetType(discordpp::ActivityTypes::Playing);
  activity.SetState("In Lobby");

  // Rich Presence party configuration for how many players can join
  discordpp::ActivityParty party{};
  party.SetId("party1234");
  party.SetCurrentSize(1);
  party.SetMaxSize(4);
  activity.SetParty(party);

  // Rich Presence secret is what is shared via invites
  discordpp::ActivitySecrets secrets{};
  secrets.SetJoin(lobbySecret);
  activity.SetSecrets(secrets);

  // This Rich Presence update is what enables the "Ask to Join" button in Discord
  client->UpdateRichPresence(std::move(activity), [&client](discordpp::ClientResult result) {});
});

// User B
// 3. Request to join User A's party
client->SendActivityJoinRequest(USER_A_ID, [](discordpp::ClientResult result) {});

// User A
// 4. Monitor for new invites:
client->SetActivityInviteCreatedCallback([&client](discordpp::ActivityInvite invite) {
  // 5. The game can now show that User A has received a request to join their party
  // If User A is ok with that, they can reply back:
  // Note: invite.type will be ActivityActionTypes::JoinRequest in this example
  client->SendActivityJoinRequestReply(invite, [](discordpp::ClientResult result) {});
});

// User B
// 6. Same as before, user B can monitor for invites
client->SetActivityInviteCreatedCallback([&client](discordpp::ActivityInvite invite) {
  std::cout << "💌 New invite received: " << invite.SenderId() << "\n";
  // 7. When an invite is received, ask the user if they want to accept it.
  // If they choose to do so then go ahead and invoke AcceptActivityInvite
  client->AcceptActivityInvite(invite, [&client](discordpp::ClientResult result, std::string joinSecret) {
    if (result.Successful()) {
      std::cout << "🎮 Invite accepted! Joining lobby...\n";
      // joinSecret came from User A's Rich Presence
      // 5. Join the lobby using the joinSecret
      client->CreateOrJoinLobby(joinSecret, [=](discordpp::ClientResult result, uint64_t lobbyId) {
        // Successfully joined lobby!
        if (result.Successful()) {
          std::cout << "🎮 Lobby joined successfully! " << lobbyId << std::endl;
        } else {
          std::cerr << "❌ Lobby join failed\n";
        }
      });
    }
  });
});

```

---

