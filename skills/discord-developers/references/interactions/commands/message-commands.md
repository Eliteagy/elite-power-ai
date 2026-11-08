# Message commands
Context: Discord developer reference: Message commands
[Source](subcommands-and-localization-index.md) / [Previous source section](user-commands-example-interaction.md) / [Following source section](message-commands-example-interaction.md)
<a id="source-message-commands"></a> <a id="source-example-message-command"></a>

### Message Commands

 Message commands are application commands available from a message context menu, reached by right click or tap. They expose quick app actions that target messages. They take no arguments, and the interaction response includes the message that was clicked or tapped. Do not provide a `description` field when creating message commands. To keep existing data models stable, fetched commands return `description` as an **empty string** rather than `null`.

###### Example Message Command

```
{
    "name": "Challenge",
    "type": 3
}

```

 (Figure: An example message command. The context menu has an Apps section open to a Bookmark command) When a message command is used, your application receives an interaction:

