# Voice Muting Based on Player Blocks

Date: 2026-04-24
Categories: Discord Social SDK, HTTP API
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L654) · [Year index](INDEX.md)

<a id="source-voice-muting-based-on-player-blocks"></a>


A new how-to guide explains how to implement bidirectional voice muting in lobby voice calls based on block relationships. It describes two ways to populate per-member mute lists: client-side using client-accessible block signals such as Discord relationships or in-game block lists, and server-side through lobby member metadata set at lobby creation. It also gives one shared client-side approach that applies mutes both ways. The [`POST /lobbies/{lobby.id}/members/bulk`](https://docs.discord.com/developers/resources/lobby#bulk-update-lobby-members) endpoint is now documented too; it can add, update, or remove up to 25 lobby members in one request. [Voice Muting Based on Player Blocks](https://docs.discord.com/developers/discord-social-sdk/how-to/voice-muting-for-blocked-players)
