# Entry point handlers
Context: Discord developer reference: Entry point handlers
[Source](subcommands-and-localization-index.md) / [Previous source section](entry-point-commands.md) / [Following source section](default-entry-point-command.md)
<a id="source-entry-point-handlers"></a>

### Entry Point handlers

 When someone invokes an app's Entry Point command, [`handler`](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-structure) controls how Discord processes the interaction:
- With `APP_HANDLER` (`1`), the application must [respond to the interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#responding-to-an-interaction). It may launch the related Activity by returning the `LAUNCH_ACTIVITY` (type `12`) [interaction callback type](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type), or it may perform another action such as sending a channel follow-up message.
- With `DISCORD_LAUNCH_ACTIVITY` (`2`), Discord processes the interaction for you by opening the linked Activity and posting a message in the launch channel.

