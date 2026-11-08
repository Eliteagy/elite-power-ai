# Create global application command
Context: Discord developer reference: Create global application command
[Source](command-endpoints-and-permissions-index.md) / [Previous source section](get-global-application-commands.md) / [Following source section](get-global-application-command.md)
<a id="source-create-global-application-command"></a> <a id="source-json-params"></a>

### Create Global Application Command

  Creating an application command with a name already used by that application replaces the prior command. This endpoint creates a global command and returns `201` when no matching name existed, or `200` when it overwrites the existing command. In both cases, the body contains an [application command](https://docs.discord.com/developers/interactions/application-commands#application-command-object) object.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | Name of command, 1-32 characters |
| name_localizations? | ?dictionary keyed by available locales | Localization entries for `name`; each value must satisfy the restrictions that apply to `name`. |
| description? | string | 1-100 character description for `CHAT_INPUT` commands |
| description_localizations? | ?dictionary keyed by available locales | Localization entries for `description`; each value must satisfy the restrictions that apply to `description`. |
| options? | array of application command option | Command parameters, limited to 25, and valid only on `CHAT_INPUT` commands. |
| default_member_permissions? | ?string | Permissions encoded as a bit set. |
| dm_permission? | ?boolean | **Deprecated (use `contexts` instead)**; controls DM availability with the app for globally-scoped commands only. Commands are visible by default. |
| default_permission? | boolean | Superseded by `default_member_permissions` and planned for future deprecation. Specifies whether the command starts enabled by default when the app is installed in a guild. Default is `true`. |
| integration_types? | list of integration types | Installation context(s) that expose the command. |
| contexts? | list of interaction context types | Interaction context(s) allowed to invoke the command. |
| type? | one of application command type | Command type; uses `1` when omitted. |
| nsfw? | boolean | Whether this command is marked age-restricted. |
| handler? | one of entry point command handler types | Selects whether Discord or the app's interactions handler processes the interaction. Applies only to `PRIMARY_ENTRY_POINT` commands. |

