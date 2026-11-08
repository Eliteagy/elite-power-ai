# Server side
Context: Discord developer reference: Server side
[Source](voice-muting-for-blocked-players-index.md) / [Previous source section](client-side.md) / [Following source section](apply-the-mute-list.md)
<a id="source-server-side"></a>

### Server-Side

 Choose this path when the block source is external, when the server must enforce bi-directional muting without trusting clients to publish metadata, or when very large block lists need to be filtered to the players currently in the lobby. The server can reduce each player's block list to only members in the session and write that result into metadata as the lobby is created. Because the server knows the joining set, it only checks block relationships among those participants, not every block the player has. Step 2's client code covers the reverse direction by checking whether another lobby member listed the local player.

The complete program is in the [upstream source](https://raw.githubusercontent.com/discord/discord-api-docs/aaef8ae4c3398fcdabeec0d1dd5a3e69be587ad8/developers/discord-social-sdk/how-to/voice-muting-for-blocked-players.mdx).

 When players enter after lobby creation, update metadata with the blocklists that apply to them. Use [`POST /lobbies/{lobby.id}/members/bulk`](https://docs.discord.com/developers/resources/lobby#bulk-update-lobby-members) for up to 25 member additions or updates at once, or [`PUT /lobbies/{lobby.id}/members/{user.id}`](https://docs.discord.com/developers/resources/lobby#add-a-member-to-a-lobby) for one member.

---

