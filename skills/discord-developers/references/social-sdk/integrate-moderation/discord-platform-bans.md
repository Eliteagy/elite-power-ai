# Discord platform bans
Context: Discord developer reference: Discord platform bans
[Source](integrate-moderation-index.md) / [Previous source section](handling-content-edits.md) / [Following source section](discord-server-bans.md)
<a id="source-handling-users-with-banned-discord-accounts"></a> <a id="source-discord-platform-bans"></a>

### Handling Users with Banned Discord Accounts

### Discord Platform Bans

 If Discord bans a player's Discord account, temporarily or permanently, the player can no longer authenticate to the app through Discord, the current [`Client`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a91716140c699d8ef0bdf6bfd7ee0ae13) disconnects, OAuth2 tokens are invalidated, and an [`APPLICATION_DEAUTHORIZED`](https://docs.discord.com/developers/events/webhook-events#application-deauthorized) webhook is sent. Mechanically, the ban is a Discord-initiated [unmerge](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#unmerging-provisional-accounts): OAuth2 tokens are removed, and a new cross-platform-restricted provisional account replaces the linked Discord identity. The full lifecycle is documented in [Ban-Driven Unmerge](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#ban-driven-unmerge) in the Provisional Accounts guide. Auth signals and integration architecture are covered in [Out-of-Band Revocation](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#out-of-band-revocation) in the Account Linking guide.

