# Adding bot permissions
Context: Discord developer reference: Adding bot permissions
[Source](hosting-on-cloudflare-workers-index.md) / [Previous source section](creating-an-app-on-discord.md) / [Following source section](creating-your-cloudflare-worker.md)
<a id="source-adding-bot-permissions"></a>

### Adding bot permissions

 Next, grant the bot the [permissions](https://docs.discord.com/developers/topics/permissions) needed to create and use slash commands and to send channel messages.
- Open the [OAuth2 tab](https://discord.com/developers/applications/select/oauth2/url-generator), choose `URL Generator`, and select the `bot` and `applications.commands` scopes.
- Select `Send Messages` and `Use Slash Commands`, then copy the `Generated URL`.
 (Figure: Configuring bot permissions in app settings)
- Open the generated URL in a browser, complete the OAuth flow, and choose the server where the bot will be developed and tested.

