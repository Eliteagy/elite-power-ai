# Contexts
Context: Discord developer reference: Contexts
[Source](command-definitions-and-registration-index.md) / [Previous source section](updating-and-deleting-a-command.md) / [Following source section](installation-context.md)
<a id="source-contexts"></a>

### Contexts

 Application commands have two context-related fields on the [application command object](https://docs.discord.com/developers/interactions/application-commands#application-command-object) that configure when and where the command is usable:
- `integration_types` defines the supported **[installation contexts](https://docs.discord.com/developers/interactions/application-commands#installation-context)** for the command
- `contexts` defines the **[interaction contexts](https://docs.discord.com/developers/interactions/application-commands#interaction-contexts)** where the command may be used
 The sections below describe both context types. Contexts are separate from [command permissions](https://docs.discord.com/developers/interactions/application-commands#permissions) for server-installed apps and do not affect those permissions.

