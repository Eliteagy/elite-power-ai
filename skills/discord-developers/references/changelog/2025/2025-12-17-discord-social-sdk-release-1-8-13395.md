# Discord Social SDK Release 1.8.13395

Date: 2025-12-17
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1190) · [Year index](INDEX.md)

<a id="source-discord-social-sdk-release-1813395"></a>


Discord Social SDK has a new release with these updates:

<a id="source-moderation-metadata-support"></a>

### Moderation Metadata Support

- [Coming Soon] Messages will add [`MessageHandle::ModerationMetadata`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#afb9ae126f6b1f0de006f2be8e3688205), custom string key-value pairs for carrying moderation information between a game backend and client.
  - This SDK version contains support for that feature, but the feature becomes usable only after a later Discord API change.

<a id="source-websocket-reporting"></a>

### WebSocket Reporting

- SDK logs now include an HTTP status code when a WebSocket connection fails.

<a id="source-playstation-5-1"></a>

### PlayStation 5

- Improved timing-metric accuracy for monitoring connection and voice-call health.
