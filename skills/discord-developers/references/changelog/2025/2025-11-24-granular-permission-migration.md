# Permission Changes Going into Effect February 2026 for PIN_MESSAGES, BYPASS_SLOWMODE, CREATE_GUILD_EXPRESSIONS, and CREATE_EVENTS

Date: 2025-11-24
Categories: Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1288) · [Year index](INDEX.md)

<a id="source-permission-changes-going-into-effect-february-2026-for-pin_messages-bypass_slowmode-create_guild_expressions-and-create_events"></a>


Discord announced permission changes that take effect in February 2026. The permissions below were introduced without breaking existing behavior, but the breaking portion starts on February 23, 2026, when older permissions stop granting these abilities. The changes split several actions away from broader permissions so bots and users can be controlled more precisely.

<a id="source-whats-changing"></a>

### What’s Changing?

**1. Pin Messages Permission**
- The `PIN_MESSAGES` permission (`1 << 51`) was separated from `MANAGE_MESSAGES` on August 20, 2025.
- See the [change log](https://docs.discord.com/developers/change-log#pin-permission-split).
- Beginning February 23, 2026, pinning messages requires `PIN_MESSAGES`; `MANAGE_MESSAGES` by itself will not be enough.
**2. Bypass Slowmode Permission**
- The `BYPASS_SLOWMODE` permission (`1 << 52`) is being separated from `MANAGE_MESSAGES`, `MANAGE_CHANNEL`, and `MANAGE_THREADS`.
- See the [change log](https://docs.discord.com/developers/change-log#new-bypassslowmode-permission-permission-split).
- Note: This mostly impacts users because bots are not subject to slowmode restrictions.
- Beginning February 23, 2026, users need `BYPASS_SLOWMODE` to be exempt from slowmode restrictions.
**3. Create Expressions Permission**
- The `CREATE_GUILD_EXPRESSIONS` permission (`1 << 43`) was created in July 2023 and separated from `MANAGE_GUILD_EXPRESSIONS` for users in December 2023. See the [change log](https://docs.discord.com/developers/change-log#clarification-on-permission-splits-for-expressions-and-events).
- Bots now have access to the `CREATE_GUILD_EXPRESSIONS` permission.
- See the [change log](https://docs.discord.com/developers/change-log#guild-expressions-and-events-permissions-now-available-to-developers).
- Beginning February 23, 2026, bots need `CREATE_GUILD_EXPRESSIONS` to create custom emoji and stickers; `MANAGE_GUILD_EXPRESSIONS` by itself will not be enough.
**4. Create Events Permission**
- The `CREATE_EVENTS` permission (`1 << 44`) was created in July 2023 and separated from `MANAGE_EVENTS` for users in December 2023. See the [change log](https://docs.discord.com/developers/change-log#clarification-on-permission-splits-for-expressions-and-events).
- Bots now have access to the `CREATE_EVENTS` permission.
- See the [change log](https://docs.discord.com/developers/change-log#guild-expressions-and-events-permissions-now-available-to-developers).
- Beginning February 23, 2026, bots need `CREATE_EVENTS` to create scheduled events; `MANAGE_EVENTS` by itself will not be enough.

<a id="source-what-do-you-need-to-do"></a>

### What Do You Need to Do?

Review and update bot permission requests before February 23, 2026 if your bot does any of the following:
- **Message pinning:** Request `Pin Messages`
- **Custom emoji or sticker creation:** Request `Create Expressions`
- **Scheduled event creation:** Request `Create Events`
The changes give server administrators tighter control over bot and user capabilities, improving security and permission management.
