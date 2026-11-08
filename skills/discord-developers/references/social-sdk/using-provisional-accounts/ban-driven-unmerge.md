# Ban driven unmerge
Context: Discord developer reference: Ban driven unmerge
[Source](merge-lifecycle-and-clients-index.md) / [Owning endpoint, event, object or procedure conditions](out-of-band-unmerge.md) / [Following source section](data-migration-during-unmerging.md)
<a id="source-ban-driven-unmerge"></a>

#### Ban-Driven Unmerge

 When Discord temporarily or permanently bans a player's Discord account, Discord automatically unmerges it. Two effects follow:
1. **OAuth2 tokens are deleted immediately**. This produces the same `APPLICATION_DEAUTHORIZED` webhook and `invalid_grant` on refresh that other out-of-band revocations produce. There is no grace period.
2. **A new provisional account is created for the same external identity.** Normal unmerge migration still applies, so username, friends list, lobbies, and related data are preserved and the player keeps the in-game social graph after the Discord identity is removed. The new provisional account starts in a **restricted** state.
 While that new provisional account remains restricted:
- It **cannot be merged** into another Discord account. A merge attempt through `/oauth2/token` with `external_auth_token` fails with error `530017` "Merge source user is banned".
- For a **temporary ban**, the restriction is removed automatically when the ban ends, after which the provisional account can merge again.
- For a **permanent ban**, the restriction remains indefinitely.
 No API reports whether a player's Discord account is currently banned. Use `APPLICATION_DEAUTHORIZED` and/or `invalid_grant` on refresh as the signal to fall back to the provisional account flow.

