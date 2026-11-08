# Bot authorization flow
Context: Discord developer reference: Bot authorization flow
[Source](scopes-grants-and-installation-index.md) / [Previous source section](bot-vs-user-accounts.md) / [Following source section](advanced-bot-authorization.md)
<a id="source-bot-authorization-flow"></a> <a id="source-bot-auth-parameters"></a> <a id="source-url-example"></a>

### Bot Authorization Flow

 Bot authorization is a callback-less, server-less OAuth2 variant that lets users add bots to guilds with little setup. The generated URL resembles the full-stack version:

###### Bot Auth Parameters

| name | description |
| --- | --- |
| client_id | your app’s client id |
| scope? | must include `bot` for the bot flow |
| permissions? | the permissions you’re requesting |
| guild_id? | preselects a guild in the user's guild dropdown |
| disable_guild_select? | `true` or `false`; prevents the user from changing the guild dropdown |
| integration_type? | authorization installation context |

###### URL Example

```
https://discord.com/oauth2/authorize?client_id=157730590492196864&scope=bot&permissions=1

```

 For bots, set `scope` to `bot`. The `permissions` parameter is also available; it is an integer derived from the bot's [permission calculations](https://docs.discord.com/developers/topics/permissions#permissions-bitwise-permission-flags). Notice that `response_type` and `redirect_uri` are absent, because bot authorization does not retrieve the user's access token. When a user opens this page, Discord prompts them to add the bot to a guild where they have the needed permissions. If they accept, the bot is added. If you already know the ID of the target guild, include it as `guild_id=GUILD_ID`; when the page opens, Discord preselects that guild if the user can add the bot there. Combine this with `disable_guild_select=true` to prevent the user from choosing another guild. If the URL supplies only `client_id`, and optionally `permissions`, `guild_id`, or `disable_guild_select`, authorization uses the [default install settings](https://docs.discord.com/developers/resources/application#configuring-an-install-link-and-default-install-settings) from the developer portal. Supplying `scope`, `integration_type`, or `redirect_uri` overrides that default behavior. If the bot should remain private, leave `Public Bot` unchecked in the application's settings; then only you can add it to guilds. If it is public, anyone with the bot URL can add it to guilds where they have sufficient permissions.

