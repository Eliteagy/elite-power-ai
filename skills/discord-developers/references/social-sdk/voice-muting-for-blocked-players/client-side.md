# Client side
Context: Discord developer reference: Client side
[Source](voice-muting-for-blocked-players-index.md) / [Previous source section](populate-the-mute-list.md) / [Following source section](server-side.md)
<a id="source-client-side"></a>

### Client-Side

 Choose this path when the client can directly access the block source, such as Discord relationships, an in-game friend/block list, or another local data source. On lobby join, derive the mute list from the available client-side information and write those IDs into the player's own member metadata with [`Client::CreateOrJoinLobbyWithMetadata`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a5c84fa76c73cf3c0bfd68794ca5595c1). Other lobby members can then see that list and apply reciprocal muting. The sample uses Discord block relationships; replace the `myMuteList` construction when your game uses a different signal.

```
const auto lobbySecret = "my-lobby-secret";

// Example: build the mute list from Discord block relationships.
// Replace this with your own logic if using a different data source.
std::string myMuteList;
for (const auto& rel : client->GetRelationships()) {
    if (rel.DiscordRelationshipType() == discordpp::RelationshipType::Blocked) {
        if (!myMuteList.empty()) myMuteList += ",";
        myMuteList += std::to_string(rel.Id());
    }
}

// Join the lobby with your mute list in your member metadata
client->CreateOrJoinLobbyWithMetadata(
  lobbySecret,
  {},  // no lobby-level metadata needed
  {{"mute_list", myMuteList}},
  [](const discordpp::ClientResult &result, uint64_t lobbyId) {
      if (!result.Successful()) {
          std::cerr << "Failed to join lobby\n";
      }
  }
);

```

 Member metadata is capped at 1,000 characters total. A Discord snowflake ID plus comma separator is about 19 characters, so roughly 50 blocked users fit comfortably. If that is not enough, use the Server Side approach.

