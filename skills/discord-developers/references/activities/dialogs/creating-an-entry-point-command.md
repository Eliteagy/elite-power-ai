# Creating an entry point command
Context: Discord developer reference: Creating an entry point command
[Source](user-actions-index.md) / [Owning endpoint, event, object or procedure conditions](setting-up-an-entry-point-command.md) / [Previous source section](customizing-the-default-entry-point-command.md) / [Following source section](encourage-hardware-acceleration.md)
<a id="source-creating-an-entry-point-command"></a>

#### Creating an Entry Point Command

 To add an Entry Point command from scratch, call [Create Global Application Command](https://docs.discord.com/developers/interactions/application-commands#create-global-application-command) and set the [command `type`](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-types) to `PRIMARY_ENTRY_POINT` (type `4`). A payload might be shaped like this:

```
{
  "name": "launch",
  "description": "Launch Realms of Wumpus",
  // PRIMARY_ENTRY_POINT is type 4
  "type": 4,
  // DISCORD_LAUNCH_ACTIVITY is handler value 2
  "handler": 2,
  // integration_types and contexts define where your command can be used (see below)
  "integration_types": [0, 1],
  "contexts": [0, 1, 2]
}

```

 Besides `type` and `handler`, the command payload contains `integration_types` and `contexts`, which control the places where the command is available and usable:
- `integration_types` specifies the [installation contexts](https://docs.discord.com/developers/resources/application#installation-context) where the command appears: server installs, user-account installs, or both. If command creation omits `integration_types`, Discord defaults it to the app's [currently-supported installation contexts](https://docs.discord.com/developers/resources/application#setting-supported-installation-contexts).
- `contexts` specifies the [interaction contexts](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-context-types) in which Discord permits the command to run. The choices cover guild context, a direct message with your app, and direct or Group DM conversations with other users.
 The [command contexts](https://docs.discord.com/developers/interactions/application-commands#contexts) documentation gives the complete details for both fields.

---

