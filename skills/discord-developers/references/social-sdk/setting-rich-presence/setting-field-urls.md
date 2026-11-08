# Setting field urls
Context: Discord developer reference: Setting field urls
[Source](setting-rich-presence-index.md) / [Previous source section](setting-assets.md) / [Following source section](setting-buttons.md)
<a id="source-setting-field-urls"></a>

### Setting Field URLs

 Rich Presence supports URLs on `details`, `state`, `assets.large_image`, and `assets.small_image`. When set, the matching text or image becomes a clickable link.

```
activity.SetState("Playing on Mainframe");
activity.SetStateUrl("https://example.com/maps/mainframe");
activity.SetDetails("Rank #1337 in global leaderboard");
activity.SetDetailsUrl("https://example.com/leaderboard/global");

discordpp::ActivityAssets assets;
assets.SetLargeImage("map-mainframe");
assets.SetLargeText("Mainframe");
assets.SetLargeUrl("https://example.com/maps/mainframe");
assets.SetSmallImage("tank-avatar");
assets.SetSmallText("Tank");
assets.SetSmallUrl("https://example.com/classes/tank");

activity.SetAssets(assets);

```

---

