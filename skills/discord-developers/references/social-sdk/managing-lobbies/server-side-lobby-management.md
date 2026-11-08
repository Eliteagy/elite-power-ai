# Server side lobby management
Context: Discord developer reference: Server side lobby management
[Source](managing-lobbies-index.md) / [Previous source section](managing-lobbies.md) / [Following source section](client-side-lobby-management.md)
<a id="source-server-side-lobby-management"></a>

### Server-Side Lobby Management

 Use the Discord HTTP API to create, update, delete, and manage membership for lobbies. The [Lobby](https://docs.discord.com/developers/resources/lobby) API resource lists the endpoints, and [Use with Discord APIs](https://docs.discord.com/developers/discord-social-sdk/how-to/use-with-discord-apis) explains request authentication. SDK clients cannot use [`Client::CreateOrJoinLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8b4e195555ecaa89ccdfc0acd28d3512), [`Client::CreateOrJoinLobbyWithMetadata`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a5c84fa76c73cf3c0bfd68794ca5595c1), or [`Client::LeaveLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8c78f797240b35d721383461a2e62926) for lobbies created through the API.

