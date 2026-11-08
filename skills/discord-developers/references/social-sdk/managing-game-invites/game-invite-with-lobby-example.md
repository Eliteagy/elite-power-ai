# Game invite with lobby example
Context: Discord developer reference: Game invite with lobby example
[Source](managing-game-invites-index.md) / [Previous source section](using-game-invites-with-lobbies.md) / [Following source section](lobby-join-request-example.md)
<a id="source-game-invite-with-lobby-example"></a>

### Game Invite with Lobby Example

 This code sample demonstrates one way to implement the sequence:

```
// User A
// 1. Create a lobby with secret
std::string lobbySecret = "foo";
uint64_t USER_B_ID = 1234567890;
client->CreateOrJoinLobby(lobbySecret, [client, lobbySecret, USER_B_ID](discordpp::ClientResult result, uint64_t lobbyId) {
  if (!result.Successful()) return;
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
  secrets.SetJoin(lobbySecret);  // This connects Rich Presence to your lobby
  activity.SetSecrets(secrets);

  // Don't forget to set this Rich Presence update, otherwise SendActivityInvite won't work!
  client->UpdateRichPresence(std::move(activity), [client, USER_B_ID](discordpp::ClientResult result) {
    if (!result.Successful()) return;
    // 3. NOW we can send invites because Rich Presence is configured
    client->SendActivityInvite(USER_B_ID, "come play with me", [](discordpp::ClientResult result) {
        if(result.Successful()) {
            std::cout << "💌 Invite sent successfully!\n";
        } else {
            std::cerr << "❌ Invite failed - check Rich Presence configuration\n";
        }
    });
  });
});

// User B
// 4. Monitor for new invites
client->SetActivityInviteCreatedCallback([&client](discordpp::ActivityInvite invite) {
  std::cout << "💌 New invite received: " << invite.SenderId() << "\n";
  // 5. When an invite is received, ask the user if they want to accept it.

  // If they choose to do so then go ahead and invoke AcceptActivityInvite
  client->AcceptActivityInvite(invite, [&client](discordpp::ClientResult result, std::string joinSecret) {
    if (result.Successful()) {
      std::cout << "🎮 Invite accepted! Joining lobby...\n";
      // joinSecret came from User A's Rich Presence configuration

      // 6. Join the lobby using the joinSecret
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

