# Putting it all together
Context: Discord developer reference: Putting it all together
[Source](managing-game-invites-index.md) / [Previous source section](adding-join-secret-supported-platforms.md) / [Following source section](registering-a-launch-command.md)
<a id="source-putting-it-all-together"></a>

### Putting It All Together

```
// Create discordpp::Activity - This Rich Presence Activity is your invite configuration
discordpp::Activity activity;
activity.SetType(discordpp::ActivityTypes::Playing);

// Set the game state and details
activity.SetState("In Competitive Match");
activity.SetDetails("Valhalla");

// Set the party information
discordpp::ActivityParty party;
party.SetId("party1234");
party.SetCurrentSize(1);          // current party size
party.SetMaxSize(5);              // max party size
// Set the party information in the Activity, to inform the invite about the party size and how many players can join
activity.SetParty(party);

// Create ActivitySecrets
discordpp::ActivitySecrets secrets;
secrets.SetJoin("joinsecret1234");    // Rich Presence secret will be in the invite payload
activity.SetSecrets(secrets);

// Set supported platforms that can join the game
// See discordpp::ActivityGamePlatforms for available platforms
activity.SetSupportedPlatforms(discordpp::ActivityGamePlatforms::Desktop);

// Update Rich Presence presence
client->UpdateRichPresence(activity, [](discordpp::ClientResult result) {
    if(result.Successful()) {
        std::cout << "🎮 Rich Presence updated successfully!\n";
        // ✅ Rich Presence updated = Game invites now available!
    } else {
        std::cerr << "❌ Rich Presence update failed";
        // ❌ No Rich Presence = No invites possible
    }
});

```

 Your game now publishes rich presence data that supports game invites. Friends who view the rich presence in the Discord client will see an invite button.

---

