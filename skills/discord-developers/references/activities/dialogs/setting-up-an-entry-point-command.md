# Setting up an entry point command
Context: Discord developer reference: Setting up an entry point command
[Source](user-actions-index.md) / [Previous source section](open-share-moment-dialog-usage.md) / [Following source section](customizing-the-default-entry-point-command.md)
<a id="source-setting-up-an-entry-point-command"></a>

### Setting Up an Entry Point Command

 Users need an [Entry Point command](https://docs.discord.com/developers/interactions/application-commands#entry-point-commands) before they can start your Activity from Discord's [App Launcher menu](https://support.discord.com/hc/articles/21334461140375-Using-Apps-on-Discord#h_01HRQSA6C8TRHS722P1H3HW1TV). Enabling Activities in your [app's settings](http://discord.com/developers/applications) automatically creates a [default Entry Point command](https://docs.discord.com/developers/interactions/application-commands#default-entry-point-command). That default uses the `DISCORD_LAUNCH_ACTIVITY` (`2`) [handler type](https://docs.discord.com/developers/interactions/application-commands#application-command-object-entry-point-command-handler-types), so Discord launches the Activity for the user and posts a follow-up message in the launch channel. To send messages yourself, change the handler to `APP_HANDLER` (`1`). Handler behavior is covered in the [Entry Point command documentation](https://docs.discord.com/developers/interactions/application-commands#entry-point-handlers).

