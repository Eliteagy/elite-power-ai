# Bulk overwrite guild application commands
Context: Discord developer reference: Bulk overwrite guild application commands
[Source](command-endpoints-and-permissions-index.md) / [Previous source section](delete-guild-application-command.md) / [Following source section](get-guild-application-command-permissions.md)
<a id="source-bulk-overwrite-guild-application-commands"></a> <a id="source-json-params-4"></a>

### Bulk Overwrite Guild Application Commands

  Submit a list of application commands to replace the application's command list for the selected guild. The endpoint returns `200` and a list of [application command](https://docs.discord.com/developers/interactions/application-commands#application-command-object) objects. This replacement covers **all** command types: slash commands, user commands, and message commands.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| id? | snowflake | Command ID, when available. |
| name | string | Name of command, 1-32 characters |
| name_localizations? | ?dictionary keyed by available locales | Localization entries for `name`; each value must satisfy the restrictions that apply to `name`. |
| description | string | 1-100 character description |
| description_localizations? | ?dictionary keyed by available locales | Localization entries for `description`; each value must satisfy the restrictions that apply to `description`. |
| options? | array of application command option | Parameters for the command |
| default_member_permissions? | ?string | Permissions encoded as a bit set. |
| dm_permission? | ?boolean | **Deprecated (use `contexts` instead)**; controls DM availability with the app for globally-scoped commands only. Commands are visible by default. |
| default_permission? | boolean | Superseded by `default_member_permissions` and planned for future deprecation. Specifies whether the command starts enabled by default when the app is installed in a guild. Default is `true`. |
| integration_types | list of integration types | Installation context(s) that expose the command; default is `GUILD_INSTALL` (`[0]`). |
| contexts | list of interaction context types | Interaction context(s) where the command is usable; defaults to every context `[0,1,2]`. |
| type? | one of application command type | Command type; uses `1` when omitted. |

