# Setting assets
Context: Discord developer reference: Setting assets
[Source](setting-rich-presence-index.md) / [Previous source section](setting-timestamps.md) / [Following source section](setting-field-urls.md)
<a id="source-setting-assets"></a>

### Setting Assets

 After assets are uploaded, reference them by **asset key** in code to display custom Rich Presence art. This example uses keys `map-mainframe`, `tank-avatar`, and `invite-cover-image`:

```
// Setting Activity Assets
discordpp::ActivityAssets assets;
assets.SetLargeImage("map-mainframe");
assets.SetLargeText("Mainframe");
assets.SetSmallImage("tank-avatar");
assets.SetSmallText("Tank");
assets.SetInviteCoverImage("invite-cover-image"); // Used for Game Invites
activity.SetAssets(assets);

```

 If you need more than 300 custom assets or prefer externally hosted images, you can [specify an external URL](https://docs.discord.com/developers/events/gateway-events#activity-object-activity-asset-image) if it meets the required dimensions and size. External URLs also allow GIF, animated WebP, and AVIF, unlike uploaded assets.

---

