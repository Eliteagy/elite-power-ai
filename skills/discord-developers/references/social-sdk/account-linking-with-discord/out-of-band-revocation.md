# Out of band revocation
Context: Discord developer reference: Out of band revocation
[Source](account-linking-with-discord-index.md) / [Previous source section](revoking-access-tokens-for-public-clients.md) / [Following source section](recommended-integration-path.md)
<a id="source-out-of-band-revocation"></a>

### Out-of-Band Revocation

 Two situations remove the user's Discord link without your code calling an unmerge or revoke endpoint:
- The user removes your app from *User Settings -> Authorized Apps* in Discord, which is a [user-initiated unmerge](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#out-of-band-unmerge).
- The user's Discord account is banned, causing a [ban-driven unmerge](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#ban-driven-unmerge) and an added cross-platform-restricted state on the new provisional account.
 Subscribe to [`APPLICATION_DEAUTHORIZED`](https://docs.discord.com/developers/events/webhook-events#application-deauthorized) so your app is notified when either event occurs. If the webhook is missed, the next token operation fails, and your game should retry through the [provisional account flow](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#implementing-provisional-accounts).

---

