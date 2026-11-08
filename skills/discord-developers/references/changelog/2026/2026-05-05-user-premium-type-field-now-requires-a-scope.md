# User Premium Type Field Now Requires A Scope

Date: 2026-05-05
Categories: HTTP API
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L641) · [Year index](INDEX.md)

<a id="source-user-premium-type-field-now-requires-a-scope"></a>


The `premium_type` field on the [User object](https://docs.discord.com/developers/resources/user#user-object-user-structure) returns `0` for applications without approval for the `identify.premium` scope. To receive Nitro subscription level, request `identify.premium` during OAuth authorization. Without that scope, the field returns `0` regardless of the user's real subscription status. The `identify.premium` scope is available only to approved partners.
