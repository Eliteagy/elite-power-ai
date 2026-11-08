# Create a discord application
Context: Discord developer reference: Create a discord application
[Source](unity-setup-and-authentication-index.md) / [Previous source section](create-a-discord-developer-team.md) / [Following source section](enable-discord-social-sdk-for-your-app.md)
<a id="source-step-2-create-a-discord-application"></a>

### Step 2: Create a Discord Application

1. In the [Discord Developer Portal](https://discord.com/developers/applications), create an application and place it under your team.
2. In the [OAuth2 tab](https://discord.com/developers/applications/select/oauth2), add a redirect URL:
  - Desktop apps can use `http://127.0.0.1/callback` (you may change it later).
  - For more advanced redirect URI setup, refer to [`discordpp::Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468).

3. Turn on `Public Client` in the [OAuth2 tab](https://discord.com/developers/applications/select/oauth2).
 This walkthrough turns on **Public Client** so the SDK can be tried quickly. Most shipped games should not remain public clients; review this setting with your team before release. [Learn more about public clients](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#oauth2-client-types).

---

