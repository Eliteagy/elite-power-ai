# Discord Social SDK Release 1.6

Date: 2025-09-26
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1508) · [Year index](INDEX.md)

<a id="source-discord-social-sdk-release-16"></a>


A Discord Social SDK release is available with these updates:

<a id="source--new-features"></a>

### ✨ New Features

- [`Client::GetGuildChannels`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#adba1e5a83c219a9c4f6dab1657778017) now returns channels sorted by their `position` field, matching the order used in the Discord client.
- Messages received through the Social SDK no longer create Discord client notifications for the same user, avoiding duplicate notifications on one machine.
**This release adds support features for upcoming Discord experiments that improve game integration with user profiles and authentication:**
- **Game Profile Integration**: New capabilities show game data on Discord user profiles. This includes `UserApplicationProfile` support and two Users class methods, `Client::GetUserApplicationProfiles` and `Client::GetUserApplicationProfilesNoLock`, which retrieve game identity data from external authentication providers.
- **In-Discord Authentication Flow**: Users can begin account linking from Discord instead of starting inside your game. Added [`Client::RegisterAuthorizeRequestCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a5f34b873e127a446c9ab549e4588ccd7) and [`Client::RemoveAuthorizeRequestCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ab7e48864b0cedf3e8572a228ca401f2a) to handle authentication requests launched from Discord entry points. These functions support upcoming Discord client experiments that will roll out gradually.

<a id="source--deprecations"></a>

### ⚠️ Deprecations

This deprecation improves consistency across the SDK API surface and provides a safer implementation with fewer edge cases and less chance of accidental misuse.
- Deprecated [`Client::GetCurrentUser`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a7edea2a3dfe9ae560d5fa5ba8663b5cc) in favor of [`Client::GetCurrentUserV2`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ae52259570ba657252d91f5580636fe5d), which returns optional values rather than handles that may be invalid.

<a id="source--performance-improvements"></a>

### 🚀 Performance Improvements

- [`Client::GetUserMessagesWithLimit`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a054a758a76c5873b38a4d79651a5f26c) now uses caching so unnecessary remote API calls can be avoided when enough messages already exist in the local cache.

<a id="source--voice-communications-fixes-and-improvements"></a>

### 🎤 Voice Communications Fixes and Improvements

This release fixes several critical voice communications bugs and improves overall reliability, noise suppression, echo suppression, and cancellation.
- Fixed an issue where voice calls sometimes entered the `Disconnected` state instead of reconnecting correctly after network interruption.
- Extended AGC2 (Automatic Gain Control 2) support to mobile platforms.

<a id="source--general-stability-and-bug-fixes"></a>

### 🐛 General Stability and Bug Fixes

Several critical bugs could cause crashes and panics. Upgrading to 1.6 is strongly recommended to avoid them in games.
- Fixed a critical bug where activity party privacy was not set correctly, causing "ask to join" to appear instead of "join" for public parties.
- Fixed a critical memory safety issue that prevented connection objects from deallocating during timer callbacks.
- Fixed C# marshaling alignment bugs and double-free crashes.
- Improved gateway resilience by falling back to generic URLs when zonal gateways fail.
- Fixed WebSocket write-after-close errors that prevented connection issues from being handled correctly.
To learn more about the Discord Social SDK, see the [Discord Social SDK Overview](https://discord.com/developers/docs/discord-social-sdk/overview). Questions can be asked in [#social-sdk-dev-help](https://discord.com/channels/613425648685547541/1350223314307776592).
