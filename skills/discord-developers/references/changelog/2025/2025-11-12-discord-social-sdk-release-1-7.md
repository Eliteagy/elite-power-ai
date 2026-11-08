# Discord Social SDK Release 1.7

Date: 2025-11-12
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1401) · [Year index](INDEX.md)

<a id="source-discord-social-sdk-release-17"></a>


Discord Social SDK has a new release with these updates:

<a id="source-authentication"></a>

### Authentication

- Added Sign in with Apple and PlayStation Network support as external identity providers.

<a id="source-linked-channels"></a>

### Linked Channels

- [`Client::GetGuildChannels`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#adba1e5a83c219a9c4f6dab1657778017) results now match the channel order shown in the Discord client. [`GuildChannel`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1GuildChannel.html#ac83eedfa1d9434dfa245ae39bb3a0915) also gained properties for type, position, and parent category ID.

<a id="source-playstation-5-2"></a>

### PlayStation 5

- Added Low Energy Mode support. SDK thread affinity can be controlled explicitly through the `cpuAffinityMask` property on [`ClientCreateOptions`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ClientCreateOptions.html#ae655ad66ba64f443496c158307cc77b4).
- Fixed a crash path involving destruction and recreation of [`Client`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a91716140c699d8ef0bdf6bfd7ee0ae13).

<a id="source-windows-1"></a>

### Windows

- Fixed a Windows issue that disabled local crash dumps in processes loading the Social SDK.

<a id="source-voice"></a>

### Voice

- On Windows, the Social SDK now uses Discord's latest audio subsystem, aligning it more closely with the desktop client. This improves device compatibility and fixes long-running problems such as Bluetooth devices switching profiles on startup.
- Desktop clients now use WebRTC m130 internally, upgraded from m116.
- Improved and fixed bugs in the DAVE E2EE protocol implementation.
