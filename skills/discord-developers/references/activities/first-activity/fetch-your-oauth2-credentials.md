# Fetch your OAuth2 credentials
Context: Discord developer reference: Fetch your OAuth2 credentials
[Source](project-and-authentication-index.md) / [Previous source section](add-a-redirect-uri.md) / [Following source section](setting-up-the-embedded-app-sdk.md)
<a id="source-fetch-your-oauth2-credentials"></a>

### Fetch Your OAuth2 Credentials

 To access user information such as username, or server information such as a server avatar, the app must request OAuth **scopes**. The sample app requests three scopes: `identify` for basic user information, `guilds` for basic information about servers the user is in, and `applications.commands` to install [commands](https://docs.discord.com/developers/interactions/overview#commands). These are requested later, and the [OAuth2 documentation](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes) lists all available scopes. Later scope requests need the app's OAuth2 identifiers. For now, copy those identifiers into the project environment file. The project root includes `example.env`; from the root, copy it to a new `.env` file:

```
cp example.env .env

```

 **Secure Your Secrets** `DISCORD_CLIENT_SECRET` and `DISCORD_BOT_TOKEN` are *highly* sensitive. Never share either secret or commit it to version control. In the app settings, open [**OAuth2**](https://discord.com/developers/applications/select/oauth2):
1. **Client ID**: Copy Client ID into `.env` as **`VITE_CLIENT_ID`**. This public ID identifies the app to Discord and is usually the same as the App ID.
2. **Client Secret**: Copy Client Secret into `.env` as **`DISCORD_CLIENT_SECRET`**. This private identifier lets the app grant an OAuth2 `access_token`; do not share it or commit it to version control.
 **Why is there a VITE_ prefix before our Client ID?** Adding `VITE_` before the `CLIENT_ID` environment variable exposes it to client-side code. This keeps only intentionally public browser variables available while other environment variables stay private. The [Vite documentation](https://vitejs.dev/guide/env-and-mode) has the details.

Step 2 Checkpoint

By the end of Step 2, verify that you have:
- Configured a placeholder Redirect URI
- Added the app's Client ID and Client Secret to the project's `.env` file.

