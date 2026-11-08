# Entry Point Commands

Date: 2024-08-26
Categories: Activities, Interactions
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2665) · [Year index](INDEX.md)

<a id="source-entry-point-commands"></a>




Apps with [Activities](https://docs.discord.com/developers/activities/overview) enabled can create [Entry Point commands](https://docs.discord.com/developers/interactions/application-commands#entry-point-commands) using the `PRIMARY_ENTRY_POINT` (type `4`) [command type](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-types). Each app can have one globally-scoped Entry Point command, shown in the App Launcher. When creating or updating an Entry Point command, set an [Entry Point handler](https://docs.discord.com/developers/interactions/application-commands#application-command-object-entry-point-command-handler-types) with the [`handler` field](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-structure). The `handler` field controls whether your app handles the interaction response itself:
- `DISCORD_LAUNCH_ACTIVITY` (`2`) lets Discord handle the interaction itself and post the follow-up message in the channel that used the Entry Point command.
- `APP_HANDLER` (`1`) sends your app an interaction token and makes your app responsible for responding. You can then launch the Activity with the `LAUNCH_ACTIVITY` (type `12`) [interaction callback](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type).
Read the [Application Commands documentation](https://docs.discord.com/developers/interactions/application-commands#entry-point-commands) and the [Activity development guide](https://docs.discord.com/developers/activities/development-guides/user-actions#setting-up-an-entry-point-command) for more about Entry Point commands.

<a id="source-default-entry-point-commands"></a>

### Default Entry Point Commands

When Activities are enabled in an [app's settings](http://discord.com/developers/applications), Discord now creates a default [Entry Point command](https://docs.discord.com/developers/interactions/application-commands#default-entry-point-command) named "Launch" for the app. You can customize or delete it like any other command when changing the name or handler type. August 13, 2024 Voice
