# Installation context
Context: Discord developer reference: Installation context
[Source](command-definitions-and-registration-index.md) / [Previous source section](contexts.md) / [Following source section](interaction-contexts.md)
<a id="source-installation-context"></a>

### Installation Context

 The [installation context](https://docs.discord.com/developers/resources/application#installation-context) is where the app is installed: a server, a user, or both. If both are supported, some commands may be intended for only one context, such as a `/profile` command for user installs. Set a command's supported installation context or contexts with [`integration_types` field](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-structure) during create or update, as long as the included contexts are already [supported on the application-level](https://docs.discord.com/developers/resources/application#setting-supported-installation-contexts). A command's `integration_types` can influence which [interaction contexts](https://docs.discord.com/developers/interactions/application-commands#interaction-contexts) show that command.

