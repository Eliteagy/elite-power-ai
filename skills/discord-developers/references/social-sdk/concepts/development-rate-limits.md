# Development rate limits
Context: Discord developer reference: Development rate limits
[Source](features-authentication-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication.md) / [Previous source section](messaging-communication-linked-channels.md) / [Following source section](applying-for-increased-rate-limits-for-production-releases.md)
<a id="source-development-rate-limits"></a>

### Development Rate Limits

 Prior to successful approval to increase rate limits, communication features have this following restrictions:
- **Lobby Create/Join operations:** 100 requests every 2 hours.
- **Lobby Update operations:** 100 requests every 2 hours.
  - This includes adding/removing members, updating metadata, plus creating Discord server invites for linked channels.

- **Lobby Linking operations:** 20 requests every 2 hours.
  - This includes creating or deleting a linked channel

- **Sending Messages to Lobby operations:** 100 requests every 2 hours
- **Sending Direct Message operations:** 100 requests every 2 hours.
 These are per-application rate limits, not per-user. The current limits leave room for development, testing, and modest demos while protecting system stability. After the rate limit increase application process grants full access, those restrictions increase enough for production-scale games.

