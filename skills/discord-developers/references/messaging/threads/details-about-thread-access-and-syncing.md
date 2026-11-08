# Details about thread access and syncing
Context: Discord developer reference: Details about thread access and syncing
[Source](threads-index.md) / [Previous source section](webhooks.md) / [Following source section](gaining-access-to-private-threads.md)
<a id="source-details-about-thread-access-and-syncing"></a>

### Details about Thread Access and Syncing

 Thread syncing resembles channel syncing, but [Thread List Sync](https://docs.discord.com/developers/events/gateway-events#thread-list-sync) and [Thread Create](https://docs.discord.com/developers/events/gateway-events#thread-create) have two important differences:
1. The [Gateway](https://docs.discord.com/developers/events/gateway) syncs only threads the app may view
2. The Gateway syncs threads only after the app has subscribed to the guild. In Discord's official clients, this subscription occurs when the user opens a channel in that guild.
 Those differences create several special cases.

