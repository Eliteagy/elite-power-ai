# Handling participants who join later
Context: Discord developer reference: Handling participants who join later
[Source](voice-muting-for-blocked-players-index.md) / [Previous source section](on-lobby-join.md) / [Following source section](best-practices.md)
<a id="source-handling-participants-who-join-later"></a>

### Handling Participants Who Join Later

 Register [`Call::SetParticipantChangedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Call.html#acb20d338a04abec2369217f41c22c0e5) so mute checks run for participants who enter during the session. The callback uses `added = true` for joins and `added = false` for leaves.

```
call.SetParticipantChangedCallback(
    [client, lobbyId, myUserId, call](uint64_t userId, const bool added) mutable {
      if (!added) return;
      auto lobby = client->GetLobbyHandle(lobbyId);
      if (!lobby) return;
      ApplyMuteChecks(call, *lobby, myUserId, userId);
    }
);

```

---

