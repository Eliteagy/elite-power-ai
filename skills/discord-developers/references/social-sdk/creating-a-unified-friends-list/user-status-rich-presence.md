# User status rich presence
Context: Discord developer reference: User status rich presence
[Source](creating-a-unified-friends-list-index.md) / [Previous source section](users.md) / [Following source section](approach-1-using-sdk-unified-friends-list-helper-functions.md)
<a id="source-user-status--rich-presence"></a>

### User Status & Rich Presence

 Presence records whether a user is online and which activities they are doing, such as playing a game. The SDK exposes two status categories:
- Online Status: Online, Offline, Idle, etc.
- Rich Presence: Activities connected to the current game, or application in Discord terminology.
 The SDK shows only activities associated with the current game, so Rich Presence will not include other game activity even when it appears in the Discord client. See [Design Guidelines: Status & Rich Presence](https://docs.discord.com/developers/discord-social-sdk/design-guidelines/status-rich-presence) for presence display guidance. You can build a unified friends list in two ways:
1. Use the SDK Unified Friends List helper functions, which group and sort relationships and users automatically.
2. Retrieve relationships and users from the SDK directly, then sort them yourself.

