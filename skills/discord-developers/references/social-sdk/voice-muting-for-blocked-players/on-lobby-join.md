# On lobby join
Context: Discord developer reference: On lobby join
[Source](voice-muting-for-blocked-players-index.md) / [Previous source section](apply-the-mute-list.md) / [Following source section](handling-participants-who-join-later.md)
<a id="source-on-lobby-join"></a>

### On Lobby Join

 Once the lobby is joined and the voice call has started, call `ApplyMuteChecks` for each other member in the lobby.

```
const auto currentUser = client->GetCurrentUserV2();
if (!currentUser) return;
const auto myUserId = currentUser->Id();
const auto lobby = client->GetLobbyHandle(lobbyId);
auto call = client->StartCall(lobbyId);

if (lobby && call) {
    for (auto memberId : lobby->LobbyMemberIds()) {
        if (memberId != myUserId) {
            ApplyMuteChecks(call, *lobby, myUserId, memberId);
        }
    }
}

// Mutes lobbyUserId locally if either myUserId or lobbyUserId has listed the other in their mute_list.
void ApplyMuteChecks(discordpp::Call& call, const discordpp::LobbyHandle& lobby,
                     const uint64_t myUserId, const uint64_t lobbyUserId) {

  auto isListed = [&](const uint64_t ownerId, const uint64_t searchId) -> bool {
    const auto member = lobby.GetLobbyMemberHandle(ownerId);
    if (!member) return false;
    auto metadata = member->Metadata();
    const auto it = metadata.find("mute_list");
    if (it == metadata.end()) return false;
    std::stringstream ss(it->second);
    std::string idStr;
    while (std::getline(ss, idStr, ',')) {
      if (std::stoull(idStr) == searchId) return true;
    }
    return false;
  };

  if (isListed(myUserId, lobbyUserId) || isListed(lobbyUserId, myUserId)) {
    call.SetLocalMute(lobbyUserId, true);
  }
}

```

