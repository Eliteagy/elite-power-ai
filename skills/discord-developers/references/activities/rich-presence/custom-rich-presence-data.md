# Custom rich presence data
Context: Discord developer reference: Custom rich presence data
[Source](developers-index.md) / [Owning endpoint, event, object or procedure conditions](understanding-rich-presence-data.md) / [Previous source section](default-rich-presence-data.md) / [Following source section](understanding-rich-presence-data-updating-presence.md)
<a id="source-custom-rich-presence-data"></a>

### Custom Rich Presence Data

 Here is the kind of custom presence Discord can show after a user joins an Activity. The [types for these fields](https://docs.discord.com/developers/rich-presence/using-with-the-embedded-app-sdk#setactivity-fields) and [examples](https://docs.discord.com/developers/rich-presence/using-with-the-embedded-app-sdk#setactivity-example) are covered later; this section is only to orient you to the visible result. (Figure: Image of where Rich Presence data appears in Discord profiles for Activities) Important details from that image:
1. `large_image` and `small_image` both belong to the `assets` object shown in the [table below](https://docs.discord.com/developers/rich-presence/using-with-the-embedded-app-sdk#activity-partial-object). The image labels use the same object keys so it is easier to match each field to its profile placement.
2. App Name is not controlled by presence data; Discord uses the name from your [app’s settings](https://discord.com/developers/applications).
3. The state badge `(1 of max_party)` appears only when a `party` field is present. Without `party`, Discord renders `state` as text below `details`.

