# Guild application command permissions structure
Context: Discord developer reference: Guild application command permissions structure
[Source](command-definitions-and-registration-index.md) / [Previous source section](syncing-and-unsyncing-permissions.md) / [Following source section](example-of-editing-permissions.md)
<a id="source-application-command-permissions-object"></a> <a id="source-guild-application-command-permissions-structure"></a> <a id="source-application-command-permissions-structure"></a> <a id="source-application-command-permissions-constants"></a> <a id="source-application-command-permission-type"></a> <a id="source-using-default-permissions"></a>

### Application Command Permissions Object

###### Guild Application Command Permissions Structure

 Returned when retrieving permissions for an app's command or commands in a guild.
| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | Command ID, or application ID |
| application_id | snowflake | Application ID that owns the command |
| guild_id | snowflake | ID of the guild |
| permissions | array of application command permissions | Command permissions in the guild, maximum 100 |

 If `id` is the application ID rather than a command ID, the permissions apply to every command without explicit overwrites.

###### Application Command Permissions Structure

 Application command permissions can enable or disable commands for individual users, roles, or channels in a guild.
| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | Role, user, or channel ID; may also be a permission constant |
| type | application command permission type | role (`1`), user (`2`), or channel (`3`) |
| permission | boolean | `true` to allow, `false`, to disallow |

###### Application Command Permissions Constants

 The constants below may be used in the `id` field for command permissions payloads.
| Permission | Value | Type | Description |
| --- | --- | --- | --- |
| `@everyone` | `guild_id` | snowflake | All members in a guild |
| All Channels | `guild_id - 1` | snowflake | All channels in a guild |

###### Application Command Permission Type

| Name | Value |
| --- | --- |
| ROLE | 1 |
| USER | 2 |
| CHANNEL | 3 |

 Application command permissions support detailed command access for both guild and global commands of every type. With the [necessary permissions](https://docs.discord.com/developers/interactions/application-commands#permissions), guild members and apps may grant or block access for individual users and roles, or switch commands on and off for entire channels. As threads [inherit user and role permissions from the parent channel](https://docs.discord.com/developers/topics/threads#permissions), channel command permissions also apply to contained threads. Commands a member cannot use are hidden from the command picker. Members with Administrator permission can use every command.

###### Using Default Permissions

 Default permissions can be set while creating a command with `default_member_permissions` and `context`, without a Bearer token because the setting is part of command creation and does not target particular roles, users, or channels. `default_member_permissions` defines the permissions a user needs to use the command. The value for `default_member_permissions` is a string containing the bitwise OR of [permissions](https://docs.discord.com/developers/topics/permissions#permissions-bitwise-permission-flags). Setting it to `"0"` blocks everyone in a guild from using the command unless there is a specific overwrite or the user has admin permissions. For global commands, include `BOT_DM` (`1`) in `contexts` when setting [interaction contexts](https://docs.discord.com/developers/interactions/application-commands#interaction-contexts) to control whether the command runs in DMs with the app. Guild commands do not support `BOT_DM`.

