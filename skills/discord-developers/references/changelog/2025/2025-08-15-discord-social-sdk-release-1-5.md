# Discord Social SDK Release 1.5

Date: 2025-08-15
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1694) · [Year index](INDEX.md)

<a id="source-discord-social-sdk-release-15"></a>


A Discord Social SDK release is available with these updates:

<a id="source-dm-history-support"></a>

### **DM History Support**

With DM chat history in this patch, the Social SDK can fully support asynchronous player communication in one-on-one and larger chat rooms. Players who go offline or background the game can return to the chat room history and catch up.
- Added [`Client::GetUserMessageSummaries`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a32dafc20ff1f99b019e40bdc81f46dde) and [`Client::GetUserMessagesWithLimit`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a054a758a76c5873b38a4d79651a5f26c) for retrieving direct message history.

<a id="source-rich-presence"></a>

### Rich Presence

Rich Presence can represent more activity types for a player. The "Competing" status can help games that run tournaments, weekend brackets, or other competitive play. Game invites can also be accepted across devices, so a player can join the group even when AFK.
- Added support for additional activity types: Listening, Watching, and Competing.
- Added support for new clickable URL fields and more user status customization.
- Added rich-presence invite handling across servers and gateway sessions. An invite can be accepted on another device, and [`Client::SetActivityInviteCreatedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a3b4e37a222a8662506d763514774bedc) will be invoked on connected SDK sessions.

<a id="source-linked-channels"></a>

### Linked Channels

Linked channels help groups of friends stay connected in and outside a game. A player can now join a channel's linked Discord server from in-game, keeping friend groups connected after they stop playing.
- Added [`Client::JoinLinkedLobbyGuild`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a54ec764e72e168de419ac14e24e8fc60), allowing linked lobby members to join the linked lobby's guild from in-game.

<a id="source-android"></a>

### Android

Mobile account linking is shorter for players who already have Discord installed, because authorization can open directly in the Discord mobile app.
-  Implemented native authentication support
- Fixed native authentication callback behavior when activities are terminated.
- Added an experimental Android audio setting to avoid switching the OS into voice comms mode when connected to a Bluetooth headset. Use it if you want to avoid voice volume controls and related behavior changes while Bluetooth is connected. Enable it by passing [`ClientCreateOptions`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ClientCreateOptions.html#ae655ad66ba64f443496c158307cc77b4) when creating the client and setting the `experimentalAndroidPreventCommsForBluetooth` flag. (Figure: Video showing off the account linking process in 1.4 vs 1.5 on Android)

<a id="source-ios"></a>

### iOS

Mobile account linking is shorter for players who already have Discord installed, because authorization can open directly in the Discord mobile app.
- Added native authentication support
- The experimental Game audio subsystem now prefers the iOS 18.2+ echo canceller when present and otherwise reverts to Standard mode.

<a id="source-windows"></a>

### Windows

- Added ARM64 support

<a id="source-linux"></a>

### Linux

- Ensured glibc 2.31 compatibility

<a id="source-bug-fixes"></a>

### Bug Fixes

- Fixed a bug where [`Client::SetVoiceLogDir`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a48c6b7e8bbc2b632a935acafc6a5f7a7) had no effect.
- Added clearer error event handling to distinguish server authorization errors from user cancellations.
- Fixed activity platform validation for console games.
- Fixed crash-safety issues in [`Client::GetCurrentUser`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a7edea2a3dfe9ae560d5fa5ba8663b5cc) when the client is in an unexpected non-Ready state. Added [`Client::GetCurrentUserV2`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ae52259570ba657252d91f5580636fe5d), which returns an optional handle explicitly instead of dummy data. The issue also affected the Unity and Unreal SDK versions.
- Fixed [`Call::SetPTTActive`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Call.html#ac442b1d69b9256abbb188583c0c81c41)

<a id="source-known-issues"></a>

### Known Issues

- When the network disconnects temporarily, active Calls may sometimes move to the Disconnected state instead of reconnecting. If a Call reaches Disconnected state, end and rejoin the call to reconnect.
- For DM chat history
  - No SDK-side caching exists for [`Client::GetUserMessagesWithLimit`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a054a758a76c5873b38a4d79651a5f26c).
    - Each call to [`Client::GetUserMessagesWithLimit`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a054a758a76c5873b38a4d79651a5f26c) queries the backend directly instead of using local SDK-side caching. This can affect performance, especially at high call frequency.

  - Provisional account merge message retrieval
    - Messages sent while a player used a provisional account cannot be retrieved after that account is merged into a full account.
