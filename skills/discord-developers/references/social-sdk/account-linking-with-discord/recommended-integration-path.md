# Recommended integration path
Context: Discord developer reference: Recommended integration path
[Source](account-linking-with-discord-index.md) / [Previous source section](out-of-band-revocation.md) / [Following source section](next-steps.md)
<a id="source-recommended-integration-path"></a>

### Recommended Integration Path

 The recommended Discord Social SDK integration starts with your game's primary authentication system, not Discord. That primary identity creates a provisional account first; the player can link Discord to it later. This protects game access and data if the player's Discord account has a problem, including a temporary or permanent ban. To follow this path:
1. Create the user through a [non-Discord authentication provider](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#configuring-your-identity-provider), then create a provisional account attached to that identity.
2. When the user later authenticates with Discord to link accounts, have your game backend perform the [merge their provisional account with their Discord Account](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#merging-provisional-accounts).
3. During account merging, Discord stores the provisional account's `externalAuthToken` against the Discord account. If the Discord account is banned, that `externalAuthToken` is attached to the replacement provisional account along with the original Discord account's in-game friends, and remains usable through the authentication provider that created the account.
4. Your backend should keep its own record of the user's `externalAuthToken` after the merge, because it is required to [authenticate via a provisional account](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#implementing-provisional-accounts) if Discord authentication fails because of a ban or another issue.
  Using Discord as the primary or only authentication method can cause players to permanently lose access to in-game data if their Discord account is banned, because there is no migration path to a provisional account tied to an external authentication provider.

---

