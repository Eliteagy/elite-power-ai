# Create guild application command
Context: Discord developer reference: Create guild application command
[Source](command-endpoints-and-permissions-index.md) / [Previous source section](get-guild-application-commands.md) / [Following source section](get-guild-application-command.md)
<a id="source-create-guild-application-command"></a> <a id="source-json-params-2"></a>

### Create Guild Application Command

  Creating a guild command with a name already used by the application replaces the older command. This endpoint creates a guild command, and new guild commands are usable in that guild immediately. It returns `201` when no same-name command existed, or `200` when an existing command is overwritten. Both responses contain an [application command](https://docs.discord.com/developers/interactions/application-commands#application-command-object) object.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | Name of command, 1-32 characters |
| name_localizations? | ?dictionary keyed by available locales | Localization entries for `name`; each value must satisfy the restrictions that apply to `name`. |
| description? | string | 1-100 character description for `CHAT_INPUT` commands |
| description_localizations? | ?dictionary keyed by available locales | Localization entries for `description`; each value must satisfy the restrictions that apply to `description`. |
| options? | array of application command option | Command parameters, limited to 25, and valid only on `CHAT_INPUT` commands. |
| default_member_permissions? | ?string | Permissions encoded as a bit set. |
| default_permission? | boolean | Superseded by `default_member_permissions` and planned for future deprecation. Specifies whether the command starts enabled by default when the app is installed in a guild. Default is `true`. |
| type? | one of application command type | Command type; uses `1` when omitted. |
| nsfw? | boolean | Whether this command is marked age-restricted. |

