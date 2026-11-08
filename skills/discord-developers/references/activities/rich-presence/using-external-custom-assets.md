# Using external custom assets
Context: Discord developer reference: Using external custom assets
[Source](developers-index.md) / [Owning endpoint, event, object or procedure conditions](understanding-rich-presence-data.md) / [Previous source section](uploading-custom-assets.md) / [Following source section](discord-game-shops.md)
<a id="source-using-external-custom-assets"></a>

### Using External Custom Assets

 Activities usually need to account for the proxy and [how to use external resources](https://docs.discord.com/developers/activities/development-guides/networking#using-external-resources). Rich Presence image URL fields do not require that extra handling. If 300 uploaded custom assets is not enough, or the images live elsewhere, set an external URL as `large_image` or `small_image` inside the `assets` object.

Example setting presence with an external asset

This example covers only the `setActivity()` usage. For creating the Embedded App SDK instance and authenticating users, refer to the [Building an Activity guide](https://docs.discord.com/developers/activities/building-an-activity).

```
await discordSdk.commands.setActivity({
  activity: {
    type: 2,
    state: 'Broken Hearts and Code (club edit)',
    details: 'DJ Wump',
    assets: {
      large_image: 'https://example.com/album-covers/dj-wump/broken-code-and-hearts-club-edit.jpg',
      large_text: 'Listening to a track',
    }
  }
});

```

 Assets uploaded through the developer portal are limited to PNG, JPEG, and WebP; animated uploaded assets are not supported. External URLs can also point to GIF, animated WebP, and AVIF. See [Activity Asset Image](https://docs.discord.com/developers/events/gateway-events#activity-object-activity-asset-image) for more detail.

