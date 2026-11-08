# Gateway v6 Intent Restrictions

Date: 2020-10-27
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L4138) · [Year index](INDEX.md)

<a id="source-gateway-v6-intent-restrictions"></a>


Gateway v6 now enforces gateway intent restrictions. The newer chunking limits apply regardless of which intents are in use; see [Request Guild Members](https://docs.discord.com/developers/events/gateway-events#request-guild-members). Bots without privileged intents enabled in the application dashboard will not receive the events covered by those intents. Other intents remain enabled by default unless the identify payload says otherwise. Discord also published [Gateway Update FAQ](https://dis.gd/gwupdate) with more detail about the changes and common issues.
