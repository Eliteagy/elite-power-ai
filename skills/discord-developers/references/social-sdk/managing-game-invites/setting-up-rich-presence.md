# Setting up rich presence
Context: Discord developer reference: Setting up rich presence
[Source](managing-game-invites-index.md) / [Previous source section](configuring-rich-presence-to-enable-game-invites.md) / [Following source section](adding-an-activity-party.md)
<a id="source-setting-up-rich-presence"></a>

### Setting Up Rich Presence

 This example sets rich presence in your game so game invites can use it.

```
// Create discordpp::Activity - This Rich Presence Activity is your invite configuration
discordpp::Activity activity;
activity.SetType(discordpp::ActivityTypes::Playing);

// Set the game state and details
activity.SetState("In Competitive Match");
activity.SetDetails("Valhalla");

// Update Rich Presence presence
client->UpdateRichPresence(activity, [](discordpp::ClientResult result) {
    if(result.Successful()) {
        std::cout << "🎮 Rich Presence updated successfully!\n";
        // Note: Invites are NOT yet enabled - we need party info and join secret
    } else {
        std::cerr << "❌ Rich Presence update failed";
    }
});

```

 Running the game makes the Discord client show "In Competitive Match" on "Valhalla". To send game invites, configure the rich presence [`Activity`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Activity.html#ae793d9adbe16fef402b859ba02bee682) with party data and a join secret, then add the remaining invite fields.

