# Community Invites Update

Date: 2026-02-05
Categories: HTTP API, Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1143) · [Year index](INDEX.md)

<a id="source-community-invites-update"></a>


Discord changed the community invite endpoints in two ways because of a security concern:
- [Get Target Users](https://docs.discord.com/developers/resources/invite#get-target-users) now returns a standardized CSV file whose header is `user_id`, followed by one user ID per line. If your implementation depended on the submitted header or ignored the returned header, update it to expect only `user_id` as the CSV header.
- [Get Channel Invites](https://docs.discord.com/developers/resources/channel#get-channel-invites) now returns a partial [roles](https://docs.discord.com/developers/topics/permissions#role-object) object instead of the complete role object. This breaking change means the response includes only `id`, `name`, `position`, `color`, `colors`, `icon`, and `unicode_emoji`.
