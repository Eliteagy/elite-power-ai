# Setting a cover image for the invite optional
Context: Discord developer reference: Setting a cover image for the invite optional
[Source](managing-game-invites-index.md) / [Previous source section](how-mobile-deep-links-work.md) / [Following source section](creating-a-unified-friends-list.md)
<a id="source-setting-a-cover-image-for-the-invite-optional"></a>

### Setting a Cover Image for the Invite (Optional)

 You can define an invite cover image through the rich presence activity. That image appears as the invite banner and can make the invite more noticeable. Because the image is set through rich presence, you can vary it per activity, such as by game mode or map, instead of relying on one static invite image. If no activity image is set, the banner uses the "Rich Presence Invite Image" configured on the "Rich Presence" tab in the Developer Portal. An invite cover image is optional.

```
discordpp::ActivityAssets assets;
assets.SetInviteCoverImage("invite-cover-image"); // This example uses an asset key, but you can use an external URL asset for more dynamic cover images.
activity.SetAssets(assets);

```

---

