# Fetching app credentials
Context: Discord developer reference: Fetching app credentials
[Source](developing-a-user-installable-app-index.md) / [Previous source section](creating-an-app.md) / [Following source section](add-guild-members-intent.md)
<a id="source-fetching-app-credentials"></a>

### Fetching app credentials

 From the app settings, collect the sensitive values needed by the sample, including the token and ID. The token authorizes API requests and carries the app's permissions, so treat it as highly sensitive: never share it or commit it to version control. In the project folder, rename `.env.sample` to `.env`. The `.env` file stores the app credentials. Add these three values to `.env`:
- On the [**General Information** page](https://discord.com/developers/applications/select/information), copy **Application ID**. In `.env`, replace `<YOUR_APP_ID>` with that ID.
- On the [**General Information** page](https://discord.com/developers/applications/select/information), copy **Public Key**, which verifies that HTTP requests came from Discord. In `.env`, replace `<YOUR_PUBLIC_KEY>` with that value.
- On the [**Bot** page](https://discord.com/developers/applications/select/bot), find **Token** and click "Reset Token" to generate a new bot token. In `.env`, replace `<YOUR_BOT_TOKEN>` with the new token.
 With credentials in place, configure the app for multiple installation contexts.

