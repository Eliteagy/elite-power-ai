# Bot token authentication
Context: Discord developer reference: Bot token authentication
[Source](../marketing/integration-marketing-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](overview-prerequisites.md) / [Following source section](bearer-token-authentication.md)
<a id="source-authentication-types"></a> <a id="source-bot-token-authentication"></a>

### Authentication Types

### Bot Token Authentication

 For server-to-server communication:

```
curl -X GET https://discord.com/api/v10/users/@me \
  -H "Authorization: Bot YOUR_BOT_TOKEN"

```

 In the Authorization header, always put `Bot ` before the bot token.

