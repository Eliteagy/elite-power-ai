# Discord Social SDK Release 1.1

Date: 2025-04-16
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2221) · [Year index](INDEX.md)

<a id="source-discord-social-sdk-release-11"></a>


A Discord Social SDK release is available with these updates:

<a id="source-platforms-1"></a>

### Platforms

- Added support for Xbox One and PS4 consoles.

<a id="source-auth-1"></a>

### Auth

- Added Unity Services support as an external auth provider.

<a id="source-voice-1"></a>

### Voice

- [`Client::StartCallWithAudioCallbacks`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#abcaa891769f9e912bfa0e06ff7221b05) now allows sample data changes during record and playback for custom effects processing.
- Fixed a bug where a user's speaking state could remain stuck on.
- Added [`Call::GetPTTReleaseDelay`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Call.html#ab8dc6b1527728fecb17f266d5b3e9e6e)
- Voice engine initialization is now deferred until needed.
- Fixed a Linux PulseAudio backend deadlock where faulty audio devices could lock up the voice engine.

<a id="source-rich-presence-1"></a>

### Rich Presence

- Added desktop support so rich presence updates and invites can be sent without a Discord gateway connection.

<a id="source-misc-3"></a>

### Misc

- Added Linux support for [`Client::RegisterLaunchCommand`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a024d7222931fdcb7d09c2b107642ecab) and [`Client::RegisterLaunchSteamApplication`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a45b2c791c5b06f77d457dacb53dfba40).
- Fixed a crash when a Unity Editor scripting domain reload, such as entering or exiting play mode, occurs while an async completion callback is pending.
- Fixed [`Client::RemoveDiscordAndGameFriend`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aa6d393a3d98ec5d06faef49a57d1a89b) so it no longer works only when you are Discord friends.
- Reduced log spam from desktop client RPC message handling.
After enabling the Discord Social SDK for your application, download the Discord Social SDK binaries from the Developer Portal. To learn more, see the [Discord Social SDK Overview](https://docs.discord.com/developers/discord-social-sdk/overview).
