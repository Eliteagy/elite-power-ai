# Edit application command permissions
Context: Discord developer reference: Edit application command permissions
[Source](command-endpoints-and-permissions-index.md) / [Previous source section](get-application-command-permissions.md) / [Following source section](batch-edit-application-command-permissions.md)
<a id="source-edit-application-command-permissions"></a> <a id="source-json-params-5"></a>

### Edit Application Command Permissions

  This endpoint replaces the command's current permissions in that guild. It edits permissions for one application command in a guild and returns a [guild application command permissions](https://docs.discord.com/developers/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure) object. The change fires an [Application Command Permissions Update](https://docs.discord.com/developers/events/gateway-events#application-command-permissions-update) Gateway event. A command can have up to 100 permission overwrites. Authenticate with a Bearer token that can manage the guild and its roles. See [application command permissions](https://docs.discord.com/developers/interactions/application-commands#permissions) for more detail. If a command is renamed or deleted, all permissions for that command are permanently removed.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| permissions | array of application command permissions | Command permissions within the guild. |

