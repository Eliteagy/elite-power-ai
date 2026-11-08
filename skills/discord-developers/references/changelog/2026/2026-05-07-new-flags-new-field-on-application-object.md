# New `flags_new` Field on Application Object

Date: 2026-05-07
Categories: HTTP API
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L626) · [Year index](INDEX.md)

<a id="source-new-flags_new-field-on-application-object"></a>


The [Application object](https://docs.discord.com/developers/resources/application#application-object) now has a `flags_new` field, a string-serialized integer containing the full set of [application flag bits](https://docs.discord.com/developers/resources/application#application-object-application-flags), including new flag bits beyond bit 30. The existing `flags` field remains serialized as a 32-bit integer. Existing integrations that read `flags` for bits at or below `2^30` are unaffected, and request payloads containing flag values should continue to use `flags`. This follows the [`permissions_new` / `allow_new` / `deny_new`](https://docs.discord.com/developers/topics/permissions) pattern previously added for permission bitfields.
