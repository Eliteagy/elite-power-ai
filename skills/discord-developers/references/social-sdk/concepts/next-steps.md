# Next steps
[Source](linking-permissions-and-support-index.md) / [Previous source section](account-linking-change-log.md) / [Following source section](next-steps.md)

<a id="source-next-steps-1"></a>

## Next Steps

Most Discord Social SDK integrations follow this general sequence across platforms:
1. Import the SDK
2. Initialize the SDK:
  - Instantiate a [`Client`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a91716140c699d8ef0bdf6bfd7ee0ae13).
  - Register event listeners for SDK callbacks and events

3. Authenticate users with flexible account choices
  - Link an existing Discord account using OAuth through [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468).
  - Use [`Client::GetProvisionalToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8003130b6c46e54ac68442483bf0480c) to create and manage provisional accounts for users who do not have, or do not want to use, a Discord account.

4. Implement social features
  - Build a [unified friends list](https://docs.discord.com/developers/discord-social-sdk/development-guides/creating-a-unified-friends-list) and manage [relationships](https://docs.discord.com/developers/discord-social-sdk/development-guides/managing-relationships).
  - Publish game activity updates with [rich presence](https://docs.discord.com/developers/discord-social-sdk/development-guides/setting-rich-presence).
  - Configure [lobbies](https://docs.discord.com/developers/discord-social-sdk/development-guides/managing-lobbies) for multiplayer interactions and [game invites](https://docs.discord.com/developers/discord-social-sdk/development-guides/managing-game-invites).
  - Manage [direct message](https://docs.discord.com/developers/discord-social-sdk/development-guides/sending-direct-messages), [linked channels](https://docs.discord.com/developers/discord-social-sdk/development-guides/creating-a-unified-friends-list), and [voice communication](https://docs.discord.com/developers/discord-social-sdk/development-guides/managing-voice-chat).

5. Handle events & API calls:
  - Subscribe to friend list changes, presence changes, and chat messages.
  - Call Discord's APIs to update statuses, send messages, and manage connections.

 This page is a conceptual overview. When you are ready to build, [follow our step-by-step guide](https://docs.discord.com/developers/discord-social-sdk/getting-started) to configure the SDK for your game engine.

---

<a id="source-next-steps-2"></a>

### Next Steps

 Review platform support, communication features, and integration setup:
