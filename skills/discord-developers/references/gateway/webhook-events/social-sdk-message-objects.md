# Social SDK message objects
Context: Discord developer reference: Social SDK message objects
[Source](webhook-events-index.md) / [Previous source section](game-direct-message-delete.md) / [Following source section](lobby-message-object.md)
<a id="source-social-sdk-message-objects"></a>

### Social SDK Message Objects

 Discord Social SDK uses specialized message objects for lobby and direct-message events during active game sessions. These objects adapt the standard Discord message structure for in-game communication features.
- [Lobby messages](https://docs.discord.com/developers/events/webhook-events#lobby-message-object) include lobby-specific fields like `lobby_id`
- [Standard Discord messages](https://docs.discord.com/developers/events/webhook-events#message-object) can include extra fields in SDK contexts
- [SDK DM messages](https://docs.discord.com/developers/events/webhook-events#sdk-dm-message-object) handle communication between provisional accounts
 Webhook events under `LOBBY_MESSAGE_*` and `GAME_DIRECT_MESSAGE_*` use these objects according to the messaging context.

