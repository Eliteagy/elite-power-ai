# Slash commands
Context: Discord developer reference: Slash commands
[Source](command-definitions-and-registration-index.md) / [Previous source section](example-of-editing-permissions.md)
<a id="source-slash-commands"></a>

### Slash Commands

 Slash commands, the `CHAT_INPUT` type, are application commands made from a name, description, and `options` block, similar to function arguments. The name and description help users discover the command, while `options` validate input during command composition. Slash commands can also use groups and subcommands for organization. Each command has an 8000 character maximum across combined name, description, and value properties for the command, its options including subcommands and groups, and choices. When [localization fields](https://docs.discord.com/developers/interactions/application-commands#localization) are present, the size calculation uses only the longest localization for each field, including the default value.
