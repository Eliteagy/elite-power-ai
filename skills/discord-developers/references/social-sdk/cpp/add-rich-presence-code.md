# Add rich presence code
Context: Discord developer reference: Add rich presence code
[Source](cpp-relationships-and-presence-index.md) / [Previous source section](set-rich-presence.md) / [Following source section](rich-presence-result.md)
<a id="source-add-rich-presence-code"></a>

### Add Rich Presence Code

 After the `client->GetRelationships()` call, add this code to set your rich presence:

```
// Configure rich presence details
discordpp::Activity activity;
activity.SetType(discordpp::ActivityTypes::Playing);
activity.SetState("In Competitive Match");
activity.SetDetails("Rank: Diamond II");

// Update rich presence
client->UpdateRichPresence(activity, [](discordpp::ClientResult result) {
  if(result.Successful()) {
    std::cout << "🎮 Rich Presence updated successfully!\n";
  } else {
    std::cerr << "❌ Rich Presence update failed";
  }
});

```

