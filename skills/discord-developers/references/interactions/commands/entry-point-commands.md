# Entry point commands
Context: Discord developer reference: Entry point commands
[Source](subcommands-and-localization-index.md) / [Previous source section](message-commands-example-interaction.md) / [Following source section](entry-point-handlers.md)
<a id="source-entry-point-commands"></a> <a id="source-example-entry-point-command"></a>

### Entry Point Commands

 An Entry Point command is the main way users open an app's [Activity](https://docs.discord.com/developers/activities/overview) through the [App Launcher](https://support.discord.com/hc/articles/21334461140375-Using-Apps-on-Discord#h_01HRQSA6C8TRHS722P1H3HW1TV). Users can see an Entry Point command only when the app has [Activities](https://docs.discord.com/developers/activities/overview) enabled. (Figure: Entry Point command in App Launcher)

###### Example Entry Point Command

```
{
    "name": "launch",
    "description": "Launch Racing with Friends",
    "type": 4,
    "handler": 2
}

```

