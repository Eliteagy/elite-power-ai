# Changes to Bot Permissions for Interactions and Webhooks

Date: 2022-06-29
Categories: Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3781) · [Year index](INDEX.md)

<a id="source-changes-to-bot-permissions-for-interactions-and-webhooks"></a> <a id="source-upcoming-changes-1"></a>


#### Upcoming Changes

Only `MENTION_EVERYONE`, `SEND_TTS_MESSAGES`, and `USE_EXTERNAL_EMOJIS` are affected. An older version of this changelog said `ATTACH_FILES` and `EMBED_LINKS` would be affected, but they are not. Starting **August 3, 2022**, calculation of some bot `MENTION_EVERYONE`, `SEND_TTS_MESSAGES`, and `USE_EXTERNAL_EMOJIS` [permissions](https://docs.discord.com/developers/topics/permissions) changes in two places:
- When **responding to an [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding)**, such as application commands or message components
- When **executing a [webhook](https://docs.discord.com/developers/resources/webhook) that the bot created**
In those cases, a bot's `MENTION_EVERYONE`, `SEND_TTS_MESSAGES`, and `USE_EXTERNAL_EMOJIS` permissions will be calculated from permissions granted to the bot, *including* [overwrites](https://docs.discord.com/developers/topics/permissions#permission-overwrites). Previously, these cases used only permissions granted to `@everyone`. This applies only to bots. Apps without a bot user, or without the `bot` scope, still depend on `@everyone`.

<a id="source-updating-your-app-1"></a>

#### Updating Your App

If a bot needs `MENTION_EVERYONE`, `SEND_TTS_MESSAGES`, or `USE_EXTERNAL_EMOJIS` while replying to interactions or executing a webhook, make sure the bot was installed with those permissions or explicitly granted them. Overwrites can still change permissions after installation. For interactions, inspect [`app_permissions` field](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) before replying to determine the app or bot's `app_permissions` context.
