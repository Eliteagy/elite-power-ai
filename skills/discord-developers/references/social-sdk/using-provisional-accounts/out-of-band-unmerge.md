# Out of band unmerge
Context: Discord developer reference: Out of band unmerge
[Source](merge-lifecycle-and-clients-index.md) / [Previous source section](unmerging-provisional-accounts-for-public-clients.md) / [Following source section](ban-driven-unmerge.md)
<a id="source-out-of-band-unmerge"></a>

### Out-of-Band Unmerge

 The link may also break even when application code never calls an unmerge endpoint:
- **User-initiated**: the user removes the app from Discord `User Settings -> Authorized Apps`. This produces a normal unmerge, and the user may link again later.
- **Ban-driven**: if Discord bans the user's Discord account, Discord breaks the link automatically. Mechanically this is an unmerge, but it has additional lifecycle effects; see Ban-Driven Unmerge below.
 Both paths expose the same auth-side signals to the app: an `APPLICATION_DEAUTHORIZED` webhook fires and stored tokens become invalid. The Account Linking guide's [Out-of-Band Revocation](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#out-of-band-revocation) section explains details and recovery. These flows require no app code changes, but an in-app unmerge option using one of the methods above usually gives users a better experience.

