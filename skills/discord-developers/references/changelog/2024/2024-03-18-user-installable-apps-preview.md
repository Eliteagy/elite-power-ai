# User-Installable Apps Preview

Date: 2024-03-18
Categories: User Apps
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2992) · [Year index](INDEX.md)

<a id="source-user-installable-apps-preview"></a>


Apps can now install to individual user accounts, which makes them easier to install, find, and use throughout Discord. A user-installed app works in all servers the user belongs to, in the user's (G)DMs, and in DMs with the app's bot user. During app creation or updates, set the supported installation types from the **Installation** page in [app's settings](https://discord.com/developers/applications). To start quickly, follow the new [Developing a User-Installable App tutorial](https://docs.discord.com/developers/tutorials/developing-a-user-installable-app) or read the details below. This change adds new API concepts and fields that apps will encounter.

<a id="source-api-changes"></a>

###### API Changes
**Concepts:**
- [Installation context](https://docs.discord.com/developers/resources/application#installation-context) records whether an app was installed to a user, a guild (server), or both. Apps currently default to the guild installation context only, though the default can change later.
- Commands may support one or both installation contexts. At creation time, a command defaults to the app's supported installation context(s).
- [Interaction context](https://docs.discord.com/developers/interactions/application-commands#interaction-contexts) identifies where a command can run in Discord: guilds, DMs with the app's bot user, and/or group DMs and DMs not with the app's bot user.
- The app installation flow now lets users choose installation to their account or to a server.
**API Fields:**
- [Applications](https://docs.discord.com/developers/resources/application#application-object) now have `integration_types_config`, which contains default scopes and permissions for the app's supported installation contexts.
- [Commands](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-structure) now have `integration_types` and `contexts` for supported [installation](https://docs.discord.com/developers/interactions/application-commands#installation-context) and [interaction](https://docs.discord.com/developers/interactions/application-commands#interaction-contexts) contexts, respectively. See [command contexts](https://docs.discord.com/developers/interactions/application-commands#contexts) docs for details.
- [Interactions](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) now include `context`, indicating the [interaction context](https://docs.discord.com/developers/interactions/application-commands#interaction-contexts) where the interaction was triggered.
- [Interactions](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) now include `authorizing_integration_owners`, a mapping from authorized installation contexts to related snowflakes. See [Authorizing Integration Owners Object](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-authorizing-integration-owners-object).
- `app_permissions` is always serialized on interactions to show the app's available [permissions](https://docs.discord.com/developers/topics/permissions#permissions-bitwise-permission-flags) in the response context. For (G)DMs with other users, it includes `ATTACH_FILES | EMBED_LINKS | MENTION_EVERYONE`; for DMs with the app's bot user, it includes `USE_EXTERNAL_EMOJIS` for the bot's DM.
- [Messages](https://docs.discord.com/developers/resources/message#message-object) created by interaction responses or follow-ups now include `interaction_metadata`; see [Message Interaction Metadata Object](https://docs.discord.com/developers/resources/message#message-interaction-metadata-object).
- The `dm_permission` field on [Commands](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-structure) is deprecated. Use `contexts` instead.
- The `interaction` field on [Messages](https://docs.discord.com/developers/resources/message#message-object) is deprecated. Use `interaction_metadata` instead.

<a id="source-limitations-and-known-issues"></a>



###### Limitations and Known Issues

- During preview, interaction responses for the user installation context are forced ephemeral in servers with over 25 members. The client enforces this, so apps do not need to track server size and receive no API errors.
- [follow-up messages](https://docs.discord.com/developers/interactions/receiving-and-responding#followup-messages) in DMs are currently forced ephemeral
- A bug prevents follow-up messages from respecting user permissions correctly
