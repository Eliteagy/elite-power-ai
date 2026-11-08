# New Social SDK Guide: Account Linking from Discord

Date: 2025-12-16
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1230) · [Year index](INDEX.md)

<a id="source-new-social-sdk-guide-account-linking-from-discord"></a>


Discord added a guide for enabling account-linking entry points inside the Discord client. With Social SDK 1.6+, Discord can show 'Link your account' prompts and buttons in the client, helping players connect game accounts and improving linking rates and social engagement. The guide covers two implementation paths:
- **Connected Game Flow (recommended)**: Uses new callback methods so clicks on Discord entry points start account linking directly in your game
- **Web Flow**: Sends players through a web OAuth flow, currently available only to select partners
[Read the full guide](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-from-discord)
