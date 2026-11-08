# Adding join secret supported platforms
Context: Discord developer reference: Adding join secret supported platforms
[Source](managing-game-invites-index.md) / [Previous source section](adding-an-activity-party.md) / [Following source section](putting-it-all-together.md)
<a id="source-adding-join-secret--supported-platforms"></a>

### Adding Join Secret & Supported Platforms

 Add a join secret to the rich presence activity as the final required piece. The `Join Secret` is an opaque value your game can use to [join a Discord lobby](https://docs.discord.com/developers/discord-social-sdk/development-guides/managing-lobbies), a game session, or another destination. Game invites let players send that secret to other players; your game decides how to interpret it. Set supported platforms too, so the Discord client can show the invite button that matches the user's platform.

```
// Create discordpp::Activity

// Create ActivitySecrets
discordpp::ActivitySecrets secrets;
secrets.SetJoin("joinsecret1234");    // Rich Presence secret will be in the invite payload
activity.SetSecrets(secrets);

// Set supported platforms that can join the game
// See discordpp::ActivityGamePlatforms for available platforms
activity.SetSupportedPlatforms(discordpp::ActivityGamePlatforms::Desktop);

// Update Rich Presence
// ✅ NOW invites are enabled through Rich Presence!

```

