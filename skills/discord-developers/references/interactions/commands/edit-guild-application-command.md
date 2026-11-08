# Edit guild application command
Context: Discord developer reference: Edit guild application command
[Source](command-endpoints-and-permissions-index.md) / [Previous source section](get-guild-application-command.md) / [Following source section](delete-guild-application-command.md)
<a id="source-edit-guild-application-command"></a> <a id="source-json-params-3"></a>

### Edit Guild Application Command

  Every parameter for this endpoint is optional. It edits a guild command, with changes becoming available immediately, and returns `200` plus an [application command](https://docs.discord.com/developers/interactions/application-commands#application-command-object) object. Any supplied field fully replaces that field's existing value.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name? | string | Name of command, 1-32 characters |
| name_localizations? | ?dictionary keyed by available locales | Localization entries for `name`; each value must satisfy the restrictions that apply to `name`. |
| description? | string | 1-100 character description |
| description_localizations? | ?dictionary keyed by available locales | Localization entries for `description`; each value must satisfy the restrictions that apply to `description`. |
| options? | array of application command option | Command parameters, limited to 25, and valid only on `CHAT_INPUT` commands. |
| default_member_permissions? | ?string | Permissions encoded as a bit set. |
| default_permission? | boolean | Superseded by `default_member_permissions` and planned for future deprecation. Specifies whether the command starts enabled by default when the app is installed in a guild. Default is `true`. |
| nsfw? | boolean | Whether this command is marked age-restricted. |

