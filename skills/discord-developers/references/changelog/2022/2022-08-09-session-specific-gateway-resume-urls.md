# Session-specific Gateway Resume URLs

Date: 2022-08-09
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3701) · [Year index](INDEX.md)

<a id="source-session-specific-gateway-resume-urls"></a>


Starting **September 12, 2022**, apps that do not use the new `resume_gateway_url` field to resume gateway sessions will be disconnected much sooner than normal. The [Ready](https://docs.discord.com/developers/events/gateway-events#ready) gateway event now includes `resume_gateway_url` for session-specific gateway reconnects. Use that value when resuming after a disconnect. Previously, `wss://gateway.discord.gg` was used for both connecting and resuming; now it should be used only for the initial connection. For now, `resume_gateway_url` always returns `wss://gateway.discord.gg` to allow migration time, but the `resume_gateway_url` value will later change to session-specific URLs.
