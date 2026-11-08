# Interaction contexts
Context: Discord developer reference: Interaction contexts
[Source](command-definitions-and-registration-index.md) / [Previous source section](installation-context.md) / [Following source section](permissions.md)
<a id="source-interaction-contexts"></a>

### Interaction Contexts

 A command's interaction contexts determine where in the Discord client it can be invoked. Configure them with the [`contexts` field](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-structure) during create or update. The three [interaction context types](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-context-types) are `GUILD` (`0`), `BOT_DM` (`1`), and `PRIVATE_CHANNEL` (`2`). `PRIVATE_CHANNEL` only matters for commands installed to a user, where `integration_types` includes `USER_INSTALL`.

