# Update your steam invite link
Context: Discord developer reference: Update your steam invite link
[Source](accounts-games-and-commerce-index.md) / [Owning endpoint, event, object or procedure conditions](what-is-game-claiming.md) / [Previous source section](find-and-select-your-game.md) / [Following source section](verify-server-ownership.md)
<a id="source-step-3-update-your-steam-invite-link"></a>

### Step 3: Update Your Steam Invite Link

 After you choose the game, the claim UI shows a `proof` query parameter. Copy it and add it to the Discord invite link on the Steam store page.
1. Copy the `proof` value displayed in the Developer Portal.
2. Edit the Discord invite link on the Steam store page so it includes the value, such as `discord.gg/yourcode?proof=<string>`.
 After the link is changed, Discord checks the `proof` value before letting you proceed.

