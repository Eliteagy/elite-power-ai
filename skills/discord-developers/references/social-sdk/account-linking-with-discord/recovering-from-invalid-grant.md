# Recovering from invalid grant
Context: Discord developer reference: Recovering from invalid grant
[Source](account-linking-with-discord-index.md) / [Owning endpoint, event, object or procedure conditions](when-refresh-fails.md) / [Following source section](revoking-access-tokens.md)
<a id="source-recovering-from-invalid_grant"></a>

#### Recovering from `invalid_grant`

 Recovery depends on whether the user still has a linked Discord account. Because `invalid_grant` merges several causes into one error, recover by attempting the provisional account fallback first and then handling error `530010`:
1. Delete the user's stored Discord tokens and start the [provisional account flow](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#implementing-provisional-accounts).
2. **If the provisional flow succeeds**, the linked account had already been reverted to a provisional account by revocation, unmerge, or ban. The player can remain in the game even though the Discord link is gone.
3. **If the provisional flow returns error code `530010`** - `User account is non-provisional and should be authed through OAuth2` - the tokens expired or became invalid while the user **still has a linked Discord account**. The token-exchange endpoint intentionally rejects the provisional path for linked users. Ask the player to complete OAuth2 authorization again so new tokens can be issued.
 To receive proactive notice when a user's authorization is revoked by unlink, token revocation, or Discord account ban, integrate the [`APPLICATION_DEAUTHORIZED`](https://docs.discord.com/developers/events/webhook-events#application-deauthorized) webhook event. That webhook lets you react immediately instead of waiting for the next refresh failure.

---

