# Merging provisional accounts
Context: Discord developer reference: Merging provisional accounts
[Source](authentication-and-merging-index.md) / [Previous source section](setting-display-names.md) / [Following source section](merging-provisional-accounts-for-servers.md)
<a id="source-merging-provisional-accounts"></a>

### Merging Provisional Accounts

 When a player converts a provisional account to a full Discord account, Discord starts a special version of the [access token request flow](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#requesting-access-tokens) that includes the provisional user's external identity.
- If you have a backend, use [Merging Provisional Accounts for Servers](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#merging-provisional-accounts-for-servers)
- If you do not have a backend, use [Merging Provisional Accounts for Public Clients](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#merging-provisional-accounts-for-public-clients)
 The merge operation has a strict per-user limit, unlike most API rate limits, because account merging is expected to be rare. Normally a player links an account only once. For merge integration testing, add QA users to the application's [App Testers](https://discord.com/developers/applications/select/testers) list to avoid testing rate limits.

