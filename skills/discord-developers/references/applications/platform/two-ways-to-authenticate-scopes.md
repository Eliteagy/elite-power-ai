# Two ways to authenticate scopes
Context: Discord developer reference: Two ways to authenticate scopes
[Source](components-discovery-and-platform-apis-index.md) / [Owning endpoint, event, object or procedure conditions](two-ways-to-authenticate.md) / [Previous source section](oauth2-user-token.md) / [Following source section](two-ways-to-authenticate-permissions.md)
<a id="source-scopes"></a>

### Scopes

 Scopes describe what an app may do. They are requested during OAuth2 authorization and must be declared in the Developer Portal. Common scopes include:
| Scope | What It Grants |
| --- | --- |
| `bot` | Adds the bot to a guild |
| `identify` | Reads the user's basic profile, such as id, username, and avatar |
| `guilds` | Lists guilds the user belongs to |
| `guilds.join` | Adds the user to a guild |
| `email` | Reads the user's email address |
| `connections` | Views the user's linked accounts, such as Twitch, Steam, and others |
| `applications.commands` | Registers slash commands in a guild |

 See the [OAuth2 scopes reference](https://docs.discord.com/developers/topics/oauth2#shared-resources) for the complete list.

