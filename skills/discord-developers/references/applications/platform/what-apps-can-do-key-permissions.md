# What apps can do key permissions
Context: Discord developer reference: What apps can do key permissions
[Source](components-discovery-and-platform-apis-index.md) / [Owning endpoint, event, object or procedure conditions](what-apps-can-do.md) / [Previous source section](what-apps-can-do-members.md) / [Following source section](what-apps-can-do-guild-resource.md)
<a id="source-key-permissions"></a>

### Key Permissions

 Most server and channel actions require explicit permissions. The [Permissions](https://docs.discord.com/developers/topics/permissions) reference lists all permissions. Common examples include:
| Permission | What It Enables |
| --- | --- |
| `MANAGE_GUILD` | Edit server settings, view audit log |
| `MANAGE_CHANNELS` | Create, edit, delete channels |
| `MANAGE_ROLES` | Create and manage roles below the bot's highest role |
| `KICK_MEMBERS` | Remove members from the server |
| `BAN_MEMBERS` | Permanently ban members |
| `MANAGE_MESSAGES` | Delete other users' messages and pin messages |
| `VIEW_CHANNEL` | View a channel and its message history |
| `SEND_MESSAGES` | Post messages in a channel |

 Channel-level overrides can change permission behavior, so a bot with server-wide access may still be blocked in a channel, or a channel may grant access not available server-wide.

