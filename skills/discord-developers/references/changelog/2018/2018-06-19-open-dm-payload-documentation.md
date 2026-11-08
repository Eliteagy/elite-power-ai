# Documentation Fix: List of Open DMS in Certain Payloads

Date: 2018-06-19
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L4401) · [Year index](INDEX.md)

<a id="source-documentation-fix-list-of-open-dms-in-certain-payloads"></a>


Docs now correctly state that `private_channels` in [Ready](https://docs.discord.com/developers/events/gateway-events#ready), and the `/users/@me/channels` response for a bot user, should be an empty array. The behavior existed already; the documentation lagged behind.
