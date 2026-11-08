# Setting up direct rich presence
Context: Discord developer reference: Setting up direct rich presence
[Source](setting-rich-presence-index.md) / [Previous source section](requirements.md) / [Following source section](next-steps.md)
<a id="source-setting-up-direct-rich-presence"></a>

### Setting Up Direct Rich Presence

 For unauthenticated Rich Presence, do the following:
1. Set the application ID with [`Client::SetApplicationId`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ad452335c06b28be0406dab824acccc49)
2. Configure your activity details
3. Call [`Client::UpdateRichPresence`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#af0a85e30f2b3d8a0b502fd23744ee58e)

```
auto client = std::make_shared<discordpp::Client>();

// Set the application ID (no Connect() call needed)
client->SetApplicationId(APPLICATION_ID);

// Configure rich presence details
discordpp::Activity activity;
activity.SetType(discordpp::ActivityTypes::Playing);
activity.SetState("In Competitive Match");
activity.SetDetails("Rank: Diamond II");

// Update rich presence
client->UpdateRichPresence(
    activity, [](const discordpp::ClientResult &result) {
      if (result.Successful()) {
        std::cout << "🎮 Rich Presence updated successfully!\n";
      } else {
        std::cerr << "❌ Rich Presence update failed";
      }
    });

```

---

