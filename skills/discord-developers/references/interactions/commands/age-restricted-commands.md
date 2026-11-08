# Age restricted commands
Context: Discord developer reference: Age restricted commands
[Source](command-endpoints-and-permissions-index.md) / [Previous source section](retrieving-localized-commands.md) / [Following source section](using-age-restricted-commands.md)
<a id="source-age-restricted-commands"></a>

### Age-Restricted Commands

 Commands that expose age-restricted material should set the [`nsfw` field](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-structure) to `true` during create or update. An age-restricted command is only visible and usable for eligible users and channel contexts. Apps with [discovery enabled](https://support-dev.discord.com/hc/en-us/articles/9489299950487), which is required for App Directory listing, must not include age-restricted commands or content.

