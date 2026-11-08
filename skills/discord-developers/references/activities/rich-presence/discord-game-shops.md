# Discord game shops
[Source](developers-index.md) / [Previous source section](using-external-custom-assets.md) / [Following source section](discord-game-shops.md)

<a id="source-discord-game-shops"></a>

## Discord Game Shops

(Figure: Discord Social Commerce Hero Image) Discord Social Commerce embeds a game's store inside Discord, where players already spend time. Game Shops let players browse items, buy them, and gift them to friends without being redirected to an outside store.

<a id="source-discord-game-shops-1"></a>

### Discord Game Shops

 A Game Shop is hosted inside the Discord server and exposes items in several Discord surfaces, including player profiles, DMs, and voice chats. Discovery can happen through social activity rather than only through deliberate store browsing. After a purchase, Discord processes the payment and creates an [entitlement](https://docs.discord.com/developers/resources/entitlement) that represents the item owed to the player. The game's backend receives the fulfillment webhook, verifies that the Discord account is linked to the game account, and grants the item.
