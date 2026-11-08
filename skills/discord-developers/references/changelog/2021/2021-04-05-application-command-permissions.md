# Application Command Permissions

Date: 2021-04-05
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L4036) · [Year index](INDEX.md)

<a id="source-application-command-permissions"></a>


Commands now support [command permissions](https://docs.discord.com/developers/interactions/application-commands#permissions). A guild or global command can be enabled or disabled for a specific user or role in a guild. At this stage, users can still see commands they cannot use. New routes support this:
- [`GET Guild Application Command Permissions`](https://docs.discord.com/developers/interactions/application-commands#get-guild-application-command-permissions)
- [`GET Application Command Permissions`](https://docs.discord.com/developers/interactions/application-commands#get-application-command-permissions)
- [`PUT Application Command Permissions`](https://docs.discord.com/developers/interactions/application-commands#batch-edit-application-command-permissions)
The [ApplicationCommand](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-structure) model gained `default_permission`. It can disable commands for everyone in a guild by default when commands should be opt-in.
