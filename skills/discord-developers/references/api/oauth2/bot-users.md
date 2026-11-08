# Bot users
Context: Discord developer reference: Bot users
[Source](scopes-grants-and-installation-index.md) / [Previous source section](client-credentials-grant.md) / [Following source section](bot-vs-user-accounts.md)
<a id="source-bot-users"></a>

### Bot Users

 Discord's API includes bot users, a user type dedicated to automation. Every app automatically receives a bot user, authenticated with the bot token from the [app's settings](https://discord.com/developers/applications). Unlike ordinary OAuth2, bot users can access most API routes without bearer tokens and can connect to the [Real Time Gateway](https://docs.discord.com/developers/events/gateway).

