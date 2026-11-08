# Set activity example
Context: Discord developer reference: Set activity example
[Source](developers-index.md) / [Owning endpoint, event, object or procedure conditions](understanding-rich-presence-data.md) / [Previous source section](activity-partial-object.md) / [Following source section](uploading-custom-assets.md)
<a id="source-setactivity-example"></a>

### setActivity Example

 Next is a more complete example. The Rich Presence shown below represents an Activity. (Figure: Example of a fake game's Rich Presence data) The matching `setActivity()` code would be:

Example calling setActivity() command

This example focuses only on `setActivity()`. For details such as creating the Embedded App SDK instance and authenticating users, follow the [Building an Activity guide](https://docs.discord.com/developers/activities/building-an-activity).

```
await discordSdk.commands.setActivity({
  activity: {
    type: 0,
    details: 'Traveling with a group',
    state: 'In Mainframe',
    assets: {
      large_image: 'main-game-image',
      large_text: 'in a group',
      small_image: 'map-mainframe',
      small_text: 'in mainframe'
    },
    timestamps: {
      start: 1723137832
    },
    party: {
      size: [2,4]
    }
  }
});

```

