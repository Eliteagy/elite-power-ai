# Calculated Permissions in Interaction Payloads

Date: 2022-06-29
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3770) · [Year index](INDEX.md)

<a id="source-calculated-permissions-in-interaction-payloads"></a>


Interaction payloads now include `app_permissions`, containing the computed [permissions](https://docs.discord.com/developers/topics/permissions#permissions-bitwise-permission-flags) for a bot or app in the interaction's context, including channel overwrites. Like other permission values, `app_permissions` is a string containing a bitwise OR-ed permission set. See the [interactions documentation](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object). Apps without a bot user, or without the `bot` scope, receive the permissions for `@everyone`, limited to permissions usable in interaction responses: `ATTACH_FILES`, `EMBED_LINKS`, `MENTION_EVERYONE`, and `USE_EXTERNAL_EMOJIS`.
