# Lobby object create lobby
Context: Discord developer reference: Lobby object create lobby
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](lobby-member-object.md) / [Following source section](create-lobby-parameters.md)
<a id="source-create-lobby"></a>

### Create Lobby

  Creates a lobby and optionally adds listed members. On success, returns a [lobby](https://docs.discord.com/developers/resources/lobby#lobby-object) object. Lobbies created with this API cannot be joined or left by [Discord Social SDK](https://docs.discord.com/developers/discord-social-sdk/overview) clients, including through [`Client::CreateOrJoinLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8b4e195555ecaa89ccdfc0acd28d3512). See [Managing Lobbies](https://docs.discord.com/developers/discord-social-sdk/development-guides/managing-lobbies#server-side-lobby-management) for more details.

