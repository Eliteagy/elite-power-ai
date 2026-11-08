# Create a discord application
Context: Discord developer reference: Create a discord application
[Source](unreal-setup-and-authentication-index.md) / [Previous source section](create-a-discord-developer-team.md) / [Following source section](enable-discord-social-sdk-for-your-app.md)
<a id="source-step-2-create-a-discord-application"></a>

### Step 2: Create a Discord Application

1. Create an application in the [Discord Developer Portal](https://discord.com/developers/applications), then assign it to the team.
2. In the [OAuth2 tab](https://discord.com/developers/applications/select/oauth2), add this redirect URL:
  - Desktop apps can use `http://127.0.0.1/callback` ; you can change it later.
  - For advanced redirect URI setup, see [`discordpp::Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468).

3. Turn on `Public Client` in the [OAuth2 tab](https://discord.com/developers/applications/select/oauth2).
 This walkthrough enables **Public Client** so the SDK can be tried quickly. Most shipped games should not use public-client mode without review. Have the team evaluate this setting before release. [Learn more about public clients](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#oauth2-client-types).

---

