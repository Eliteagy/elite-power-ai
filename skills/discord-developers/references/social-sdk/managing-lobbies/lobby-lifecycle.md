# Lobby lifecycle
Context: Discord developer reference: Lobby lifecycle
[Source](managing-lobbies-index.md) / [Previous source section](leaving-a-lobby.md) / [Following source section](sending-messages-to-a-lobby.md)
<a id="source-lobby-lifecycle"></a>

### Lobby Lifecycle

 Lobbies are designed to be temporary and should be removed when the game, match, area, or world is no longer needed. Configure a "max idle time" so Discord deletes a lobby after no users have been connected for longer than that period. If any user remains connected, the lobby is not deleted and the timer resets. The default is 5 minutes, which should fit most cases. Longer-lived cases such as "world chat" may need more time. The expected maximum "idle time" is 7 days, meaning deletion occurs only after a full week with no connections. This gives lobbies some persistence when needed, though rare cases may still require rebuilding a lobby after everyone stays offline for a long time. SDK-created lobbies using [`Client::CreateOrJoinLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8b4e195555ecaa89ccdfc0acd28d3512) have another limit: the "secret" used for the call expires after 30 days. The lobby can still exist, but new users cannot join it with that secret after expiration.

---

