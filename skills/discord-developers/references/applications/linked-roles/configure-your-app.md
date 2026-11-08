# Configure your app
Context: Discord developer reference: Configure your app
[Source](configuring-app-metadata-for-linked-roles-index.md) / [Previous source section](remix-the-project-project-structure.md) / [Following source section](registering-your-metadata-schema.md)
<a id="source-configure-your-app"></a>

### Configure your app

 `server.js` already contains starter code, but requests need the app token and IDs. Store these credentials in `.env`. Do not commit credentials or secrets; the starter project's `.gitignore` already includes `.env`. First copy the bot user's token from earlier into `DISCORD_TOKEN` in `.env`. Then open the [app settings in the developer portal](https://discord.com/developers/applications), go to [OAuth2 -> General](https://discord.com/developers/applications/select/oauth2), and copy the application's Client ID and Client Secret into `DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET` in `.env`. (Figure: Configure OAuth2) Next configure the Redirect URL for the OAuth2 flow. In Glitch, press `Share` and copy the public live app URL. (Figure: Glitch Share) Return to [OAuth2 -> General](https://discord.com/developers/applications/select/oauth2) in the Discord developer portal and add a redirect using the Glitch URL plus `/discord-oauth-callback`. Copy that redirect URL into `DISCORD_REDIRECT_URI` in `.env`. Then open the [General Information tab](https://discord.com/developers/applications/select/information), find `Linked Roles Verification Url`, and save the Glitch base URL plus `/linked-role`. For the screenshot project, the verification URL would be `https://adjoining-crawling-yamamomo.glitch.me/linked-role` . (Figure: Verify endpoint) Finally, return to Glitch, open the `Terminal` tab, and generate a unique cookie secret with these commands:

```
$ node
crypto.randomUUID()

```

 Copy the generated UUID and set it as `COOKIE_SECRET` in `.env`. The `.env` file should resemble this:

```
DISCORD_CLIENT_ID: <your OAuth2 client Id>
DISCORD_CLIENT_SECRET: <your OAuth2 client secret>
DISCORD_TOKEN: <your bot token>
DISCORD_REDIRECT_URI: https://<your-project-name>.glitch.me/discord-oauth-callback
COOKIE_SECRET: <random generated UUID>

```

