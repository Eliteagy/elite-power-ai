# Connected game best practices
Context: Discord developer reference: Connected game best practices
[Source](entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](implementing-the-connected-game-flow.md) / [Following source section](overview-web-flow.md)
<a id="source-connected-game-best-practices"></a>

### Connected Game Best Practices

 Selecting an account-link button in Discord is a high-intent action. Avoid extra upsell steps until after the account is linked, because added steps increase drop-off points. Show upsells afterward to reinforce new features or rewards unlocked by linking. Enable and disable the callback at the right times; launching account linking from Discord during a match can interrupt gameplay and break the intended experience. You do not need to check whether the user is already linked, because the Discord client hides the entry point for linked users. Relying on that behavior keeps the implementation simpler and reduces failure surface.

