# Encourage hardware acceleration best practices
Context: Discord developer reference: Encourage hardware acceleration best practices
[Source](user-actions-index.md) / [Owning endpoint, event, object or procedure conditions](encourage-hardware-acceleration.md) / [Following source section](encourage-hardware-acceleration-usage.md)
<a id="source-best-practices"></a>

#### Best Practices

 Changing Hardware Acceleration makes the Discord client quit and restart, so call this command early enough that users have not already begun the app experience. A good placement is immediately after `await discordSdk.ready()`.

