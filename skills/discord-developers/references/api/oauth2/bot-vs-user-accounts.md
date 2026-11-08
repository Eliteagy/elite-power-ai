# Bot vs user accounts
Context: Discord developer reference: Bot vs user accounts
[Source](scopes-grants-and-installation-index.md) / [Previous source section](bot-users.md) / [Following source section](bot-authorization-flow.md)
<a id="source-bot-vs-user-accounts"></a>

### Bot vs User Accounts

 Developers must follow the [terms of service](https://support-dev.discord.com/hc/articles/8562894815383-Discord-Developer-Terms-of-Service), including the restriction against automating normal user accounts, often called "self-bots", outside the OAuth2/bot API. Bot users differ from regular Discord users in several ways:
1. Bots join guilds through the OAuth2 API and cannot accept ordinary invites.
2. Bots cannot have friends, be added to Group DMs, or join Group DMs.
3. [Verified bots](https://support-dev.discord.com/hc/en-us/articles/23926564536471-How-Do-I-Get-My-App-Verified) are not capped at a maximum guild count.
4. Bots use their own separate [rate limits](https://docs.discord.com/developers/topics/rate-limits#rate-limits).

