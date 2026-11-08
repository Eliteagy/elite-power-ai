# Edit global application command
Context: Discord developer reference: Edit global application command
[Source](command-endpoints-and-permissions-index.md) / [Previous source section](get-global-application-command.md) / [Following source section](delete-global-application-command.md)
<a id="source-edit-global-application-command"></a> <a id="source-json-params-1"></a>

### Edit Global Application Command

  Every parameter for this endpoint is optional. It edits a global command and returns `200` with an [application command](https://docs.discord.com/developers/interactions/application-commands#application-command-object) object. Supplying a field fully replaces the command's current value for that field.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name? | string | Name of command, 1-32 characters |
| name_localizations? | ?dictionary keyed by available locales | Localization entries for `name`; each value must satisfy the restrictions that apply to `name`. |
| description? | string | 1-100 character description |
| description_localizations? | ?dictionary keyed by available locales | Localization entries for `description`; each value must satisfy the restrictions that apply to `description`. |
| options? | array of application command option | Command parameters, limited to 25, and valid only on `CHAT_INPUT` commands. |
| default_member_permissions? | ?string | Permissions encoded as a bit set. |
| dm_permission? | ?boolean | **Deprecated (use `contexts` instead)**; controls DM availability with the app for globally-scoped commands only. Commands are visible by default. |
| default_permission? | boolean | Superseded by `default_member_permissions` and planned for future deprecation. Specifies whether the command starts enabled by default when the app is installed in a guild. Default is `true`. |
| integration_types? | list of integration types | Installation context(s) that expose the command. |
| contexts? | list of interaction context types | Interaction context(s) allowed to invoke the command. |
| nsfw? | boolean | Whether this command is marked age-restricted. |
| handler? | one of entry point command handler types | Selects whether Discord or the app's interactions handler processes the interaction. Applies only to `PRIMARY_ENTRY_POINT` commands. |

