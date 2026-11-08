# Guild Expressions and Events Permissions now available to developers

Date: 2025-11-20
Categories: Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1357) · [Year index](INDEX.md)

<a id="source-guild-expressions-and-events-permissions-now-available-to-developers"></a>


Discord introduced permission splits in 2023 for guild expressions, which include custom emoji and stickers, and for scheduled events. Those splits gave server administrators more precise control over who can create community content. See the [change log](https://docs.discord.com/developers/change-log#clarification-on-permission-splits-for-expressions-and-events). These permissions are now available to bot developers and will be required for selected actions starting **February 23, 2026**. **Create Guild Expressions Permission**
- The `CREATE_GUILD_EXPRESSIONS` permission (`1 << 43`) was created in July 2023 and separated from `MANAGE_GUILD_EXPRESSIONS` for users in December 2023.
- Bots now have access to the `CREATE_GUILD_EXPRESSIONS` permission.
- Beginning February 23, 2026, bots need `CREATE_GUILD_EXPRESSIONS` to create custom emoji and stickers; `MANAGE_GUILD_EXPRESSIONS` by itself will not be enough.
**Create Events Permission**
- The `CREATE_EVENTS` permission (`1 << 44`) was created in July 2023 and separated from `MANAGE_EVENTS` for users in December 2023.
- Bots now have access to the `CREATE_EVENTS` permission.
- Beginning February 23, 2026, bots need `CREATE_EVENTS` to create scheduled events; `MANAGE_EVENTS` by itself will not be enough.
