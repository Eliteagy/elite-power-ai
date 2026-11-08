# Create a discord application
Context: Discord developer reference: Create a discord application
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](create-a-discord-developer-team.md) / [Following source section](enable-discord-social-sdk-for-your-app.md)
<a id="source-step-2-create-a-discord-application"></a>

### Step 2: Create a Discord Application

1. Create an application in the [Discord Developer Portal](https://discord.com/developers/applications) and place it under your team.
2. Add a redirect URL on the [OAuth2 tab](https://discord.com/developers/applications/select/oauth2):
  - Desktop applications can use `http://127.0.0.1/callback` and you can change it later.
  - See [`discordpp::Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468) for details on configuring more advanced redirect URIs.

3. Turn on the `Public Client` toggle in the [OAuth2 tab](https://discord.com/developers/applications/select/oauth2).
 This guide uses **Public Client** so you can begin with the SDK quickly. Most games should not ship as a public client; review this setting with your team before release. [Learn more about public clients](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#oauth2-client-types).

---

