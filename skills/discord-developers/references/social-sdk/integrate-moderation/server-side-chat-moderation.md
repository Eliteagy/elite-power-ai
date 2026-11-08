# Server side chat moderation
Context: Discord developer reference: Server side chat moderation
[Source](integrate-moderation-index.md) / [Previous source section](game-developer-s-responsibility.md) / [Following source section](how-it-works.md)
<a id="source-server-side-chat-moderation"></a>

### Server-Side Chat Moderation

 The moderation metadata API lets a backend evaluate messages and write application-scoped `moderation_metadata` onto them. Discord stores that metadata and sends it to active game sessions through realtime `GAME_DIRECT_MESSAGE_UPDATE` or `LOBBY_MESSAGE_UPDATE` [Webhook Events](https://docs.discord.com/developers/events/webhook-events), so polling is unnecessary. Other applications cannot see the metadata, and it is excluded from other API endpoints and Gateway events.

