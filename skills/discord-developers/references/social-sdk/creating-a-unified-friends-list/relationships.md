# Relationships
Context: Discord developer reference: Relationships
[Source](creating-a-unified-friends-list-index.md) / [Previous source section](implementing-a-unified-friends-list.md) / [Following source section](users.md)
<a id="source-relationships"></a>

### Relationships

 [Relationships](https://docs.discord.com/developers/discord-social-sdk/development-guides/managing-relationships) represent Discord friends, friend requests, and related states. The Client loads every relationship for the current user when it connects. Each relationship includes a target user id and a type, such as `Friend`, `PendingOutgoing`, or `Blocked`. To let users manage relationships from your game, provide controls to accept or reject friend requests, block users, and handle pending requests. See [Development Guide: Managing Relationships in Your Game](https://docs.discord.com/developers/discord-social-sdk/development-guides/managing-relationships) for implementation details.

