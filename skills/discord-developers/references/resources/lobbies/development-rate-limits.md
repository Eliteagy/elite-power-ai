# Development rate limits
Context: Discord developer reference: Development rate limits
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](create-lobby-channel-invite-for-user.md)
<a id="source-development-rate-limits"></a>

### Development Rate Limits

 Applications that do not have [increased rate limits for production releases](https://docs.discord.com/developers/discord-social-sdk/core-concepts/communication-features#applying-for-increased-rate-limits-for-production-releases) use these application-wide development limits:
| Endpoint | Limit |
| --- | --- |
| `POST /lobbies` | 100 per 2 hours |
| `PUT /lobbies` | 100 per 2 hours |
| `PATCH /lobbies/{lobby.id}` | 100 per 2 hours |
| `PUT /lobbies/{lobby.id}/members/{user.id}` | 100 per 2 hours |
| `DELETE /lobbies/{lobby.id}/members/{user.id}` | 100 per 2 hours |
| `POST /lobbies/{lobby.id}/members/bulk` | 100 per 2 hours |
| `POST /lobbies/{lobby.id}/members/@me/invites` | 100 per 2 hours |
| `POST /lobbies/{lobby.id}/members/{user.id}/invites` | 100 per 2 hours |
| `PATCH /lobbies/{lobby.id}/channel-linking` | 20 per 2 hours |
| `POST /lobbies/{lobby.id}/messages` | 100 per 2 hours |

 These limits apply per application, not per user. They are intended to support development, testing, and small demos while protecting system stability.
