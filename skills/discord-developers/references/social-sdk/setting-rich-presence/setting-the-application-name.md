# Setting the application name
Context: Discord developer reference: Setting the application name
[Source](setting-rich-presence-index.md) / [Previous source section](setting-details-and-state.md) / [Following source section](setting-timestamps.md)
<a id="source-setting-the-application-name"></a>

### Setting the Application Name

 By default, Rich Presence uses the Discord-registered application name on the top line, for example `Playing "My Game: Chapter Two"`. To change the displayed name, set the activity `name` with [`Activity::SetName`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Activity.html#a59f9a63a8b105946d0c9838f3e643ae2) before calling [`Client::UpdateRichPresence`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#af0a85e30f2b3d8a0b502fd23744ee58e):

```
// Override the displayed application name (top line of Rich Presence)
activity.SetName("My Game: Chapter Two");

```

 Discord allows only a limited character set for registered application names. [`Activity::SetName`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Activity.html#a59f9a63a8b105946d0c9838f3e643ae2) lets you display text with more flexibility, including characters that cannot appear in the registered app name.

---

