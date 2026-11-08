# Fix Message Edit Interaction Response Permissions

Date: 2023-11-01
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3120) · [Year index](INDEX.md)

<a id="source-fix-message-edit-interaction-response-permissions"></a>


Message edit interaction response actions, including [updating interaction responses](https://docs.discord.com/developers/interactions/receiving-and-responding#edit-original-interaction-response) and [sending follow-up messages](https://docs.discord.com/developers/interactions/receiving-and-responding#followup-messages), now follow the bot user's permissions. Previously, some of these actions used default permissions instead. October 19, 2023 Premium Apps
