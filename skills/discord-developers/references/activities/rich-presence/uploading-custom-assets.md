# Uploading custom assets
Context: Discord developer reference: Uploading custom assets
[Source](developers-index.md) / [Owning endpoint, event, object or procedure conditions](understanding-rich-presence-data.md) / [Previous source section](set-activity-example.md) / [Following source section](using-external-custom-assets.md)
<a id="source-uploading-custom-assets"></a>

### Uploading Custom Assets

 To add custom Rich Presence art, open your [app's settings](https://discord.com/developers/applications), then select **Rich Presence** in the left sidebar. The [**Art Assets** page](https://discord.com/developers/applications/select/rich-presence/assets) supports up to 300 custom assets per app. Discord recommends **1024 x 1024** for all Rich Presence assets. Uploaded asset keys are automatically converted to lowercase, so reference the lowercase key in the `assets` object passed to [`setActivity()`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#setactivity); for example, `Main-Game-Image` becomes `main-game-image`. For asset-selection guidance, see the [Rich Presence best practices guide](https://docs.discord.com/developers/rich-presence/best-practices#have-interesting-expressive-art).

