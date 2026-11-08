# Uploading assets
Context: Discord developer reference: Uploading assets
[Source](setting-rich-presence-index.md) / [Previous source section](setting-an-invite-image.md) / [Following source section](setting-details-and-state.md)
<a id="source-uploading-assets"></a>

### Uploading Assets

 Most Rich Presence integrations need custom app artwork. Discord strongly recommends 1024 x 1024 images for Rich Presence assets. In the app settings, choose Rich Presence in the left sidebar and use the [Art Assets page](https://discord.com/developers/applications/select/rich-presence/assets) to upload either of two asset types. (Figure: Rich Presence invite image in app settings) An app can store up to 300 custom assets for later Rich Presence use. These assets can be any art that helps others understand what the user is doing in your Activity or 3rd party game. If 300 assets is not enough, or your images live elsewhere, you can [specify an external URL](https://docs.discord.com/developers/events/gateway-events#activity-object-activity-asset-image) when it has the required dimensions and size. External URLs, unlike uploaded assets, may use GIF, animated WebP, and AVIF. For asset selection guidance, see the [Rich Presence best practices guide](https://docs.discord.com/developers/rich-presence/best-practices#have-interesting-expressive-art). Uploaded Rich Presence asset keys are **automatically converted to lowercase**. The app settings show this after save, and code should reference the lowercase key. After upload, use the asset key in code when [Setting Assets in Rich Presence](https://docs.discord.com/developers/discord-social-sdk/development-guides/setting-rich-presence#setting-assets). (Figure: Rich Presence assets in app settings)

---

