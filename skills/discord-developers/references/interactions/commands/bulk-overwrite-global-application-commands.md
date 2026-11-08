# Bulk overwrite global application commands
Context: Discord developer reference: Bulk overwrite global application commands
[Source](command-endpoints-and-permissions-index.md) / [Previous source section](delete-global-application-command.md) / [Following source section](get-guild-application-commands.md)
<a id="source-bulk-overwrite-global-application-commands"></a>

### Bulk Overwrite Global Application Commands

  Submit a list of application commands to replace the application's current global command list. The endpoint returns `200` with a list of [application command](https://docs.discord.com/developers/interactions/application-commands#application-command-object) objects. Commands not already present consume daily application command creation quota. The replacement covers **all** command types: slash commands, user commands, and message commands.

