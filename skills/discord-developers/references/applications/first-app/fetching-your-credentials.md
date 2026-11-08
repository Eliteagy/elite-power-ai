# Fetching your credentials
Context: Discord developer reference: Fetching your credentials
[Source](app-registration-and-commands-index.md) / [Previous source section](creating-an-app.md) / [Following source section](configuring-your-bot.md)
<a id="source-fetching-your-credentials"></a>

### Fetching your credentials

 The app needs several sensitive credentials, including its token and ID. The token authorizes API requests and carries app permissions, so treat it as *highly* sensitive: never share it or commit it to version control. In the project folder, rename `.env.sample` to `.env`; the `.env` file stores the app credentials. Add these three values from the app settings:
- On the [**General Information** page](https://discord.com/developers/applications/select/information), copy **Application ID**. In `.env`, replace `<YOUR_APP_ID>` with that value.
- On the [**General Information** page](https://discord.com/developers/applications/select/information), copy **Public Key**, which verifies that HTTP requests came from Discord. In `.env`, replace `<YOUR_PUBLIC_KEY>` with the copied value.
- On the [**Bot** page](https://discord.com/developers/applications/select/bot), under **Token**, click **Reset Token** to create a new bot token. In `.env`, replace `<YOUR_BOT_TOKEN>` with it.
 The token is hidden after generation unless you regenerate it, so store it securely, such as in a password manager. With credentials ready, configure the bot user and installation settings.

