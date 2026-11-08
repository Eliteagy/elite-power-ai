# Setting details and state
Context: Discord developer reference: Setting details and state
[Source](setting-rich-presence-index.md) / [Previous source section](uploading-assets.md) / [Following source section](setting-the-application-name.md)
<a id="source-setting-details-and-state"></a>

### Setting Details and State

 This minimal example sets activity details and state:

```
// Create a new activity
discordpp::Activity activity;
activity.SetType(discordpp::ActivityTypes::Playing);
activity.SetDetails("Battle Creek");
activity.SetState("In Competitive Match");

// Update the presence
client->UpdateRichPresence(activity, [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "✅ Rich presence updated!\n";
  }
});

```

---

