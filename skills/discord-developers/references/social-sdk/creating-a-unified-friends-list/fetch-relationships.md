# Fetch relationships
Context: Discord developer reference: Fetch relationships
[Source](creating-a-unified-friends-list-index.md) / [Previous source section](approach-2-manually-fetching-relationships-and-users.md) / [Following source section](organize-relationships.md)
<a id="source-step-1-fetch-relationships"></a>

### Step 1: Fetch Relationships

 Start by creating a function that uses [`Client::GetRelationships`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ad481849835cd570f0e03adafcf90125d) to query relationships and user information for the account:

```
void DisplayFriendsList(discordpp::Client& client) {
    std::vector<std::string> relationships{};
    for (auto& relationship: client->GetRelationships()) {
        auto user = relationship.User();
        if (!user) {
            continue;
        }

        std::string str{};
        // Identifying information about the user:
        str += " DiscordName: " + user->DisplayName();
        str += " DiscordId: " + std::to_string(user->Id());
        // Provisional users don't have a Discord icon shown next to them:
        str += " IsProvisional: " + std::to_string(user->IsProvisional());
        // Whether the relationship is for a friend, a friend request, or because the user is blocked:
        // For a friends list you'll want to filter out blocked users
        // And likely display friend requests in a different section
        str += " DiscordRelationshipType: " + std::string(discordpp::EnumToString(relationship.DiscordRelationshipType()));
        str += " GameRelationshipType: " + std::string(discordpp::EnumToString(relationship.GameRelationshipType()));
        // Whether the user is online/offline/etc:
        str += " IsOnlineAnywhere: " + std::to_string(user->Status() != discordpp::StatusType::Offline);
        str += " IsOnlineInGame: " + std::to_string(user->GameActivity() != std::nullopt);
        relationships.push_back(str);
    }

    std::sort(relationships.begin(), relationships.end());
    for (auto str : relationships) {
        printf("%s\n", str.c_str());
    }
}

```

 The `relationship.User()` function returns a [`UserHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1UserHandle.html#a587bcc838e42dc5c56f840a350070707) object for a user known to the Discord Social SDK. Handle objects keep references to the SDK instance and underlying data, so existing handles reflect data updates without being recreated. Call this function once the client is ready by adding it to the ready callback:

```
// Set up status callback to monitor client connection
client->SetStatusChangedCallback([client](discordpp::Client::Status status, discordpp::Client::Error error, int32_t errorDetail) {
    std::cout << "🔄 Status changed: " << discordpp::Client::StatusToString(status) << std::endl;

    if (status == discordpp::Client::Status::Ready) {
        std::cout << "✅ Client is ready! You can now call SDK functions.\n";
        std::cout << "👥 Friends Count: " << client->GetRelationships().size() << std::endl;

        SetRichPresence(client);
        DisplayFriendsList(client);

    } else if (error != discordpp::Client::Error::None) {
        std::cerr << "❌ Connection Error: " << discordpp::Client::ErrorToString(error) << " - Details: " << errorDetail << std::endl;
    }
});

```

 This prints raw relationship data to the console. Use the data to filter, organize, and assemble a friends list that matches your game's design.

---

