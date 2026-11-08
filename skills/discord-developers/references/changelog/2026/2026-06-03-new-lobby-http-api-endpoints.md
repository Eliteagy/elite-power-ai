# New Lobby HTTP API Endpoints

Date: 2026-06-03
Categories: Discord Social SDK, HTTP API
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L545) · [Year index](INDEX.md)

<a id="source-new-lobby-http-api-endpoints"></a>


The Discord [Lobby resource](https://docs.discord.com/developers/resources/lobby) reference now includes several public endpoints:
- **[Create or Join Lobby](https://docs.discord.com/developers/resources/lobby#create-or-join-lobby)** (`PUT /lobbies`) - create a lobby for your application or join an existing lobby by `secret` in one request.
- **[Send Lobby Message](https://docs.discord.com/developers/resources/lobby#send-lobby-message)** (`POST /lobbies/{lobby.id}/messages`) - send a lobby message on behalf of an authenticated member.
- **[Get Lobby Messages](https://docs.discord.com/developers/resources/lobby#get-lobby-messages)** (`GET /lobbies/{lobby.id}/messages`) - retrieve up to 200 recent messages from a lobby where the caller is a member.
- **[Create Lobby Channel Invite for Self](https://docs.discord.com/developers/resources/lobby#create-lobby-channel-invite-for-self)** and **[for User](https://docs.discord.com/developers/resources/lobby#create-lobby-channel-invite-for-user)** - create a single-use, one-hour guild invite for a lobby's linked channel.
