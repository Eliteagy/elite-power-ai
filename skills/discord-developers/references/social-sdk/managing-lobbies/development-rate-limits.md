# Development rate limits
Context: Discord developer reference: Development rate limits
[Source](managing-lobbies-index.md) / [Previous source section](creating-lobby-invites.md) / [Following source section](next-steps.md)
<a id="source-development-rate-limits"></a>

### Development Rate Limits

 Apps that have not received [increased rate limits for production releases](https://docs.discord.com/developers/discord-social-sdk/core-concepts/communication-features#applying-for-increased-rate-limits-for-production-releases) must follow these application-wide limits:
| Operation | Limit |
| --- | --- |
| `Client::CreateOrJoinLobby` | 100 per 2 hours |
| `Client::LinkChannelToLobby` | 20 per 2 hours |
| `Client::UnlinkChannelFromLobby` | 20 per 2 hours |
| `Client::SendLobbyMessage` | 100 per 2 hours |

 These limits apply per application rather than per user. They are intended to allow development, testing, and small demos while maintaining service stability. For handling and retrying SDK requests after rate limits, see [Handle Rate Limits](https://docs.discord.com/developers/discord-social-sdk/how-to/handle-rate-limits).

---

