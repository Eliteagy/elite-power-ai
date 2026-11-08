# Default entry point command
Context: Discord developer reference: Default entry point command
[Source](project-and-authentication-index.md) / [Owning endpoint, event, object or procedure conditions](enable-activities.md) / [Following source section](running-your-activity-in-discord.md)
<a id="source-default-entry-point-command"></a>

#### Default Entry Point Command

 Enabling Activities automatically creates a [default Entry Point command](https://docs.discord.com/developers/interactions/application-commands#default-entry-point-command) named **Launch**. This [Entry Point command](https://docs.discord.com/developers/interactions/application-commands#entry-point-commands) is the main way users start the Activity in Discord. By default, using it opens the Activity for the user and posts a message in the launch channel. If your app should handle those interactions itself, update the [`handler` field](https://docs.discord.com/developers/interactions/application-commands#entry-point-handlers) or create a custom command. See the Entry Point command [documentation](https://docs.discord.com/developers/interactions/application-commands#entry-point-commands) and [development guide](https://docs.discord.com/developers/activities/development-guides/user-actions#setting-up-an-entry-point-command) for more detail.

