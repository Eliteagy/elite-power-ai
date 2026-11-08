# What is account linking
[Source](accounts-games-and-commerce-index.md) / [Previous source section](overview.md) / [Following source section](what-is-account-linking.md)

<a id="source-what-is-account-linking"></a>

## What is Account Linking?

(Figure: Account Linking Hero Image) *Already know the basics? Go straight to the implementation guides or the [Social SDK docs](https://docs.discord.com/developers/discord-social-sdk/overview).*

<a id="source-what-is-account-linking-1"></a>

### What is Account Linking?

 Account linking associates a player's Discord account with their in-game account. After the connection is made, the game can surface Discord friends, invites, rich presence, and voice without leaving the game. The connection remains available between sessions, so the player signs in once and only has to link again if your account linking [scopes](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes) are changed. Players who are not ready to connect Discord, or who do not yet have a Discord account, can still use social systems through [provisional accounts](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts). If they connect Discord later, their friends, DM history, and lobby memberships are carried over to the Discord account automatically. Account linking is a key requirement for [Social Commerce](https://docs.discord.com/developers/social-commerce/overview) in Discord communities because linked players can redeem in-game items bought or gifted through Discord Game Shops.
