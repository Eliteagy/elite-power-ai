# Understanding rich presence data updating presence
Context: Discord developer reference: Understanding rich presence data updating presence
[Source](developers-index.md) / [Owning endpoint, event, object or procedure conditions](understanding-rich-presence-data.md) / [Previous source section](custom-rich-presence-data.md) / [Following source section](rpc-activities-write-scope.md)
<a id="source-updating-presence"></a>

### Updating Presence

 With the Embedded App SDK, custom Rich Presence updates mainly go through **[`setActivity()`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#setactivity)**. Internally, `setActivity()` uses the RPC [`SET_ACTIVITY` command](https://docs.discord.com/developers/topics/rpc#setactivity) with the fields and capabilities available to Activities.

Why does the word activity appear in so many places?

A short note on the platform history behind the different activity terms

Rich Presence documentation uses the term "activity" in several overlapping ways. The "activities" in parts of the docs such as the [RPC ones](https://docs.discord.com/developers/topics/rpc#setactivity) are not the same thing as Activities built with the Embedded App SDK. When Rich Presence first launched, the object holding presence details was named an "activity" before the Embedded App SDK existed; that is why the RPC [`SET_ACTIVITY` command](https://docs.discord.com/developers/topics/rpc#setactivity) uses that terminology. The Embedded App SDK method `setActivity()` wraps that RPC command, even though it is not changing the lifecycle state of the Activity you are building. The naming can be confusing, but the distinction usually matters less than knowing which object and SDK method you are using.

