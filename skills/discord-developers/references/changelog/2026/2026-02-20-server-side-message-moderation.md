# Server-Side Message Moderation

Date: 2026-02-20
Categories: Discord Social SDK, HTTP API, Docs
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L972) · [Year index](INDEX.md)

<a id="source-server-side-message-moderation"></a>




Discord released and documented two API endpoints for changing application-scoped moderation metadata on game direct messages and lobby messages. Together with the [previously announced](https://docs.discord.com/developers/change-log#discord-social-sdk-release-1813395) [`MessageHandle::ModerationMetadata`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#afb9ae126f6b1f0de006f2be8e3688205), plus game direct message and lobby [Webhook Events](https://docs.discord.com/developers/events/webhook-events#event-types), these endpoints support server-side moderation for lobby and game direct message traffic. A game backend can review messages, attach moderation metadata, and have the Discord Social SDK stream those results to clients in real time so in-game rendering can react to moderation decisions. The updated [How To Integrate Moderation](https://docs.discord.com/developers/discord-social-sdk/how-to/integrate-moderation) guide walks through the complete server-side moderation path.
