# Default entry point command
Context: Discord developer reference: Default entry point command
[Source](subcommands-and-localization-index.md) / [Previous source section](entry-point-handlers.md) / [Following source section](autocomplete.md)
<a id="source-default-entry-point-command"></a>

### Default Entry Point command

 Enabling Activities automatically creates an Entry Point command named "Launch" for the app, using `DISCORD_LAUNCH_ACTIVITY` (`2`) as the [Entry Point handler](https://docs.discord.com/developers/interactions/application-commands#entry-point-handlers). To inspect that generated command, including its ID, call [Get Global Application Commands](https://docs.discord.com/developers/interactions/application-commands##get-global-application-commands) and find the "Launch" command. The [Setting Up an Entry Point Command guide](https://docs.discord.com/developers/activities/development-guides/user-actions#setting-up-an-entry-point-command) explains how to update or replace the default Entry Point command.

