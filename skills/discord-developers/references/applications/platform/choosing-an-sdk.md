# Choosing an SDK
[Source](components-discovery-and-platform-apis-index.md) / [Previous source section](two-ways-to-authenticate-permissions-reference.md) / [Following source section](choosing-an-sdk.md)

<a id="source-choosing-an-sdk"></a>

## Choosing an SDK

(Figure: Rich Presence) Rich Presence shows live, actionable game state on a Discord user's profile when activity sharing is enabled, such as the game being played, level, session duration, or an invitation for friends to join. It connects an app to Discord's social layer with a lightweight integration. The displayed data is controlled by the developer and can include custom text, timestamps, party size indicators, and uploaded art. With a 'Join' button, friends can jump from the profile card into that player's active game session. Native games use the Discord Social SDK, while Activities inside Discord use the Embedded App SDK.

<a id="source-choosing-an-sdk-1"></a>

### Choosing an SDK

 Rich Presence can be integrated through two SDK choices. Pick the SDK that matches the project:
- The **[Discord Social SDK](https://docs.discord.com/developers/discord-social-sdk/overview)** adds social features to a game or app, including friends lists, game invites, and more.
- The **[Embedded App SDK](https://docs.discord.com/developers/developer-tools/embedded-app-sdk)** is the right choice for building an [Activity](https://docs.discord.com/developers/activities/overview) in Discord.
 Because Rich Presence appears publicly on a Discord profile, development should use a test account that belongs only to private development server(s).
