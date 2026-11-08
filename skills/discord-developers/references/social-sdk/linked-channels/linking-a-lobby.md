# Linking a lobby
Context: Discord developer reference: Linking a lobby
[Source](linked-channels-index.md) / [Previous source section](private-channels.md) / [Following source section](unlinking-a-lobby.md)
<a id="source-user-requirements"></a> <a id="source-linking-a-lobby"></a>

### User Requirements

#### Linking A Lobby

 A lobby member can link a channel only when their `CanLinkLobby` flag is set. This flag starts disabled and must be granted through the [Lobby API](https://docs.discord.com/developers/resources/lobby) for users who should have elevated lobby permissions. Discord recommends enabling it only for the lobby equivalent of an administrator or owner, so channel configuration is limited to those users.

