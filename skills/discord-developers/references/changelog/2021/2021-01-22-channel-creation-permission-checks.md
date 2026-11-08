# Change to Permission Checking when Creating Channels

Date: 2021-01-22
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L4090) · [Year index](INDEX.md)

<a id="source-change-to-permission-checking-when-creating-channels"></a>


The guild channel creation endpoint now validates permission overwrites against the bot's guild permissions. Permission overwrites in the request body require the bot to have the permissions being applied. Setting `MANAGE_ROLES` in channel overwrites is allowed only for guild administrators or users with `MANAGE_ROLES` as a channel permission overwrite.
