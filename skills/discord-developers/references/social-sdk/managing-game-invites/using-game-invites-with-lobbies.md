# Using game invites with lobbies
Context: Discord developer reference: Using game invites with lobbies
[Source](managing-game-invites-index.md) / [Previous source section](accepting-game-invites.md) / [Following source section](game-invite-with-lobby-example.md)
<a id="source-using-game-invites-with-lobbies"></a>

### Using Game Invites with Lobbies

 You can pair game invites with [Lobbies](https://docs.discord.com/developers/discord-social-sdk/development-guides/managing-lobbies) so players can join a game session or party smoothly. When a player accepts an invite, use the join secret to connect both players in your game. One possible sequence is:
- When a user begins playing, create a lobby with a random secret string by using [`Client::CreateOrJoinLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8b4e195555ecaa89ccdfc0acd28d3512)
- The user publishes Rich Presence with the join secret set to the lobby secret and includes party size data
- Another user sees that Rich Presence in Discord and requests to join
- After the invite is accepted, the joining user gets the join secret and can pass it to CreateOrJoinLobby(joinSecret) to enter the lobby
- The original user's client notices the lobby membership change, then publishes a Rich Presence update with the new party size
 These examples use client-side lobby management, but the same pattern can be adapted for server-created lobbies.

