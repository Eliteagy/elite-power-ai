# Full access to discord friends
Context: Discord developer reference: Full access to discord friends
[Source](features-authentication-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication.md) / [Owning endpoint, event, object or procedure conditions](minimum-required-feature-set.md) / [Previous source section](rich-presence-and-discord-joins.md) / [Following source section](messaging-communication-feature-functionality.md)
<a id="source-full-access-to-discord-friends"></a>

#### Full Access to Discord Friends

 **Account-linked players must be able to access their Discord friends in-game, with supporting UI for actions such as [messaging](https://docs.discord.com/developers/discord-social-sdk/design-guidelines/direct-messages), inviting, blocking, and ignoring**. This can be implemented as a [Unified Friends List](https://docs.discord.com/developers/discord-social-sdk/design-guidelines/unified-friends-list) that shows cross-platform status, or as a simpler in-game Discord friends list. Games must never copy and store Discord friend information; when a player unlinks their Discord account, the in-game Discord friend information must be removed automatically.

