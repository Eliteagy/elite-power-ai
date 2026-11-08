# Activity State for Bot Users

Date: 2023-08-08
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3216) · [Year index](INDEX.md)

<a id="source-activity-state-for-bot-users"></a>


Bot users can now set `state` in [activity objects](https://docs.discord.com/developers/events/gateway-events#activity-object) when [updating presence](https://docs.discord.com/developers/events/gateway-events#update-presence). If the [activity's `type`](https://docs.discord.com/developers/events/gateway-events#activity-object-activity-types) is `4`, `state` appears as a custom status for the bot user; for other activity types, it appears as additional data under the activity name.
