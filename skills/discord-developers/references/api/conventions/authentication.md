# Authentication
Context: Discord developer reference: Authentication
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](error-messages.md) / [Following source section](encryption.md)
<a id="source-authentication"></a>

### Authentication

 The Discord API supports two authentication approaches:
1. Use a bot token from the Bot page in the application's settings. For bot background, see [bots vs user accounts](https://docs.discord.com/developers/topics/oauth2#bot-vs-user-accounts).
2. Use an OAuth2 bearer token obtained through the [OAuth2 API](https://docs.discord.com/developers/topics/oauth2).
 Every authentication method uses the `Authorization` HTTP header with the form `Authorization: TOKEN_TYPE TOKEN`. **Example Bot Token Authorization Header**

```
Authorization: Bot YOUR_BOT_TOKEN

```

 **Example Bearer Token Authorization Header**

```
Authorization: Bearer YOUR_BEARER_TOKEN

```

