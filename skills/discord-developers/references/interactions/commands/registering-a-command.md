# Registering a command
Context: Discord developer reference: Registering a command
[Source](command-definitions-and-registration-index.md) / [Previous source section](authorizing-your-application.md) / [Following source section](making-a-global-command.md)
<a id="source-registering-a-command"></a>

### Registering a Command

 Commands are registered only through HTTP endpoints. They may be global or scoped to a guild. Global commands are available in every guild that adds the app, and an app's global commands are also available in DMs when the app has a bot sharing a mutual guild with the user. Guild commands apply only to the specified guild and do not appear in DMs. Command names are unique per application, per type, and per scope, meaning:
- An app **cannot** define two global `CHAT_INPUT` commands with the same name
- An app **cannot** define two guild `CHAT_INPUT` commands with the same name **in the same guild**
- An app **cannot** define two global `USER` commands with the same name
- An app **can** define both global and guild `CHAT_INPUT` commands with the same name
- An app **can** define a global `CHAT_INPUT` command and a global `USER` command with the same name
- An app **cannot** define a `PRIMARY_ENTRY_POINT` guild command
- Different apps **can** use the same command names
 This is not a complete list. As a rule, command names must be unique for one application by type and by global or guild scope. Apps may have the following command counts:
- 100 global `CHAT_INPUT` commands
- 15 global `USER` commands
- 15 global `MESSAGE` commands
- 1 global `PRIMARY_ENTRY_POINT` command
 For every command type except `PRIMARY_ENTRY_POINT`, the same number of guild-specific commands is allowed per guild. Creating application commands has a global rate limit of 200 creates per day, per guild.

