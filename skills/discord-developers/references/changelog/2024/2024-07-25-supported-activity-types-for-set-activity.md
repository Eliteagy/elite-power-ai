# Supported Activity Types for SET_ACTIVITY

Date: 2024-07-25
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2740) · [Year index](INDEX.md)

<a id="source-supported-activity-types-for-set_activity"></a>


The [`SET_ACTIVITY` RPC command](https://docs.discord.com/developers/topics/rpc#setactivity) now supports 3 additional [activity types](https://docs.discord.com/developers/events/gateway-events#activity-object-activity-types): Listening (`2`), Watching (`3`), and Competing (`5`). Previously it accepted only Playing (`0`). The [Game SDK](https://docs.discord.com/developers/developer-tools/game-sdk#activities) still has not been updated to support setting [`ActivityType`](https://docs.discord.com/developers/developer-tools/game-sdk#activitytype-enum), and remains read-only for handling events received from Discord.
