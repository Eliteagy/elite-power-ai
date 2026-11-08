# User commands
Context: Discord developer reference: User commands
[Source](subcommands-and-localization-index.md) / [Previous source section](example-walkthrough.md) / [Following source section](user-commands-example-interaction.md)
<a id="source-user-commands"></a> <a id="source-example-user-command"></a>

### User Commands

 User commands are application commands shown from a user's context menu, reached by right click or tap. They are useful for quick app actions that operate on users. They accept no arguments, and the interaction response includes the user that was clicked or tapped. The invoking user must be allowed to send text messages in the channel where the user command is invoked; otherwise Discord returns a 'Permission Denied' interaction error. Do not include the `description` field when creating user commands. For data model compatibility, fetched commands return `description` as an **empty string** rather than `null`.

###### Example User Command

```
{
    "name": "View Stats",
    "type": 2
}

```

 (Figure: An example user command. The context menu has an Apps section open to a High Five command) When a user command is invoked, your app receives an interaction:

