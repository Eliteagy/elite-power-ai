# Linking from discord entry points
Context: Discord developer reference: Linking from discord entry points
[Source](accounts-games-and-commerce-index.md) / [Owning endpoint, event, object or procedure conditions](what-is-account-linking.md) / [Previous source section](what-is-account-linking-oauth2-documentation.md) / [Following source section](account-linking-from-discord-entry-points.md)
<a id="source-linking-from-discord-entry-points"></a>

### Linking from Discord Entry Points

 Discord entry points are client-side buttons and prompts that invite players to link their game account even when the game is not open. Links started from Discord behave the same as links started from the game. (Figure: Account Linking from Discord Entry Points) When a player selects an entry point, Discord chooses the flow this way:
1. **Game Flow** runs when the game is open and the developer has called `RegisterAuthorizeRequestCallback` in the Social SDK
2. **Web Flow** runs when the Developer Portal has a **Connection Entrypoint URL** configured
 Current Discord entry points include: **Game Detection** Discord notices that the player is playing your game and can offer linking if the account is not linked yet. (Figure: Discord entry points for account linking) **Game Invites** Players receiving an invite can be prompted to link so they can get into the game with friends faster. (Figure: Game Invite entry points for account linking) **Claiming Game Shop Items** Players must link accounts to redeem Game Shop items and receive their in-game rewards. (Figure: Game Shop entry points for account linking) Web Flow support from official Discord entry points is currently limited to select partners. Contact Discord if you want it enabled for your game.

