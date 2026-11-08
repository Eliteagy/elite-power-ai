# Setting buttons
Context: Discord developer reference: Setting buttons
[Source](setting-rich-presence-index.md) / [Previous source section](setting-field-urls.md) / [Following source section](configuring-status-text.md)
<a id="source-setting-buttons"></a>

### Setting Buttons

 A player's Rich Presence can include up to two custom buttons. Each button has a label plus a URL, so viewers can click through to a store page, website, community server, or another call to action.

```
discordpp::ActivityButton buyButton;
buyButton.SetLabel("Buy On Steam!");
buyButton.SetUrl("https://store.steampowered.com/app/AppID/GameName/");

discordpp::ActivityButton communityButton;
communityButton.SetLabel("Join the Community!");
communityButton.SetUrl("https://discord.gg/your-discord-url-or-id");

activity.AddButton(buyButton);
activity.AddButton(communityButton);

```

 Buttons appear only for **other users**. You cannot see buttons on your own Rich Presence, so test with another account or ask someone else to view the profile.

---

