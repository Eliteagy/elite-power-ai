# Clarification on Permission Splits for Expressions and Events

Date: 2023-12-15
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3061) · [Year index](INDEX.md)

<a id="source-clarification-on-permission-splits-for-expressions-and-events"></a>


Behavior for `MANAGE_GUILD_EXPRESSIONS` and `MANAGE_EVENTS` is **not changing**. Bot users can continue to create, update, and delete expressions/events with these permissions. No action is required if you will keep using them. To add finer controls for expressions and events, Discord added new [permissions](https://docs.discord.com/developers/topics/permissions) for users and roles in July 2023:
- `CREATE_GUILD_EXPRESSIONS`: `1 << 43`
- `CREATE_EVENTS`: `1 << 44`
These permissions allow creating expressions and events, plus editing and deleting ones created by the current user. They rolled out to users and roles in July 2023 and appear in developer documentation, but **are not yet available to app developers**. Discord will post an update when apps can use them. December 01, 2023 Voice
