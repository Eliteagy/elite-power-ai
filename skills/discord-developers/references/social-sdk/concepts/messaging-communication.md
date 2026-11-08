# Messaging communication
[Source](features-authentication-and-lobbies-index.md) / [Previous source section](core-concepts-overview-change-log.md) / [Following source section](messaging-communication.md)

<a id="source-messaging--communication"></a>

## Messaging & Communication

The Discord Social SDK includes communication features for player interaction, covering messaging, voice chat, and in-game lobbies. These communication capabilities may be used during development and testing, but they start with rate-limit caps. For the current caps, see [Rate Limits](https://docs.discord.com/developers/discord-social-sdk/core-concepts/communication-features#rate-limits). To raise the limits for a production launch, follow [Applying for Increased Rate Limits for Production Releases](https://docs.discord.com/developers/discord-social-sdk/core-concepts/communication-features#applying-for-increased-rate-limits-for-production-releases).

<a id="source-messaging--communication-1"></a>

### Messaging & Communication

 Users can communicate via direct messages (DMs) and voice calls:
- DMs: One-on-one private chat ([`MessageHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#ae25595b43bc74b0c4c92c5165d16382f)).
- Calls: Real-time voice communication inside one game lobby ([`Call`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Call.html#a1cc8a7f73c15a960bc409d734b5edbd1)).

| Development Guides |
| --- |
| Sending Direct Messages |
| Managing Voice Chat |

| Design Guidelines |
| --- |
| Direct Messages |
