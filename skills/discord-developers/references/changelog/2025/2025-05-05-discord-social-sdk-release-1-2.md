# Discord Social SDK Release 1.2

Date: 2025-05-05
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2097) · [Year index](INDEX.md)

<a id="source-discord-social-sdk-release-12"></a>


A Discord Social SDK release is available with these updates:

<a id="source-rich-presence"></a>

### Rich Presence

- Added custom button support on activity cards through [`Activity::AddButton`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Activity.html#aab07650fcff18565eb78a1e2df46627e).

<a id="source-packaging"></a>

### Packaging

- Unity and Unreal plugin artifacts now include only the extra files needed for console support, so they can be extracted over the base plugin.
- The Unity plugin now ships as a .zip to extract inside your project's Packages directory, enabling the behavior described above.
- Console archives now include a small README with console-specific documentation.

<a id="source-misc-2"></a>

### Misc

- Added [`Client::OpenConnectedGamesSettingsInDiscord`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a24f268f5eebe9919a3f774354eb577e0), which deeplinks to Discord settings for connected games and gives players some control over who can DM them.
- Fixed a Linux hang that could occur in [`Client::RegisterLaunchCommand`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a024d7222931fdcb7d09c2b107642ecab) and [`Client::RegisterLaunchSteamApplication`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a45b2c791c5b06f77d457dacb53dfba40).
- [`Client::RegisterLaunchCommand`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a024d7222931fdcb7d09c2b107642ecab) and [`Client::RegisterLaunchSteamApplication`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a45b2c791c5b06f77d457dacb53dfba40) now function inside the Steam Runtime on Linux.
- Fixed a crash on exit that could occur while callbacks remained pending in the queue.
