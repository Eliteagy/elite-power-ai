# Making a global command
Context: Discord developer reference: Making a global command
[Source](command-definitions-and-registration-index.md) / [Previous source section](registering-a-command.md) / [Following source section](making-a-guild-command.md)
<a id="source-making-a-global-command"></a>

### Making a Global Command

 Global commands are available in *all* guilds for the app. They also have read-repair behavior: after a global command is updated, if a user invokes an old version before their client has refreshed, Discord performs an internal version check, rejects that invocation, and causes the command to reload. To create a **global** command, send an HTTP POST like this:

The complete program is in the [upstream source](https://raw.githubusercontent.com/discord/discord-api-docs/aaef8ae4c3398fcdabeec0d1dd5a3e69be587ad8/developers/interactions/application-commands.mdx).

