# Launching Activities in Response to Interactions

Date: 2024-08-26
Categories: Activities, Interactions
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2656) · [Year index](INDEX.md)

<a id="source-launching-activities-in-response-to-interactions"></a>

[Activities](https://docs.discord.com/developers/activities/overview) can now be launched as an interaction response through the `LAUNCH_ACTIVITY` (type `12`) [interaction callback type](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type). `LAUNCH_ACTIVITY` is valid in responses to `APPLICATION_COMMAND`, `MESSAGE_COMPONENT`, and `MODAL_SUBMIT` [interaction types](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-type). August 26, 2024 Activities Interactions
