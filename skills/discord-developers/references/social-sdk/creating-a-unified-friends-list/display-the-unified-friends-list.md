# Display the unified friends list
Context: Discord developer reference: Display the unified friends list
[Source](creating-a-unified-friends-list-index.md) / [Previous source section](approach-1-using-sdk-unified-friends-list-helper-functions.md) / [Following source section](set-up-automatic-updates.md)
<a id="source-step-1-display-the-unified-friends-list"></a>

### Step 1: Display the Unified Friends List

 The [`Client::GetRelationshipsByGroup`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a9f7898d3f3d1ec92b06c662df70746d5) method returns pre-sorted relationships for a given group type, so you do not need to filter, categorize, or sort friends manually. The SDK decides each friend's group from online status and game activity, then sorts users inside the group; for example, users who have played your game appear first in `OnlineElsewhere`. Create a function that uses these helpers to render an organized friends list:

```
void DisplayUnifiedFriendsList(const std::shared_ptr<discordpp::Client> &client) {
    // Get friends playing the game
  const auto onlineInGame = client->GetRelationshipsByGroup(
        discordpp::RelationshipGroupType::OnlinePlayingGame
    );

    // Get friends online elsewhere
    const auto onlineElsewhere = client->GetRelationshipsByGroup(
        discordpp::RelationshipGroupType::OnlineElsewhere
    );

    // Get offline friends
    const auto offline = client->GetRelationshipsByGroup(
        discordpp::RelationshipGroupType::Offline
    );

    // Display "Online - GameTitle" Friends
    std::cout << "\n=== Online - GameTitle (" << onlineInGame.size() << ") ===\n";
    for (const auto& relationship : onlineInGame) {
        auto user = relationship.User();
        if (user) {
            std::string displayStr = "🟣 " + user->DisplayName();

            // Add Discord friend indicator
            if (relationship.DiscordRelationshipType() == discordpp::RelationshipType::Friend) {
                displayStr += " 👾";
            }

            // Add game friend indicator
            if (relationship.GameRelationshipType() == discordpp::RelationshipType::Friend) {
                displayStr += " 🎮";
            }

            std::cout << displayStr << "\n";
        }
    }

    // Display "Online - Elsewhere" Friends
    std::cout << "\n=== Online - Elsewhere (" << onlineElsewhere.size() << ") ===\n";
    for (const auto& relationship : onlineElsewhere) {
        auto user = relationship.User();
        if (user) {
            std::string displayStr = "🟢 " + user->DisplayName();

            // Add Discord friend indicator
            if (relationship.DiscordRelationshipType() == discordpp::RelationshipType::Friend) {
                displayStr += " 👾";
            }

            // Add game friend indicator
            if (relationship.GameRelationshipType() == discordpp::RelationshipType::Friend) {
                displayStr += " 🎮";
            }

            std::cout << displayStr << "\n";
        }
    }

    // Display "Offline" Friends
    std::cout << "\n=== Offline (" << offline.size() << ") ===\n";
    for (const auto& relationship : offline) {
        auto user = relationship.User();
        if (user) {
            std::string displayStr = "⚫ " + user->DisplayName();

            // Add Discord friend indicator
            if (relationship.DiscordRelationshipType() == discordpp::RelationshipType::Friend) {
                displayStr += " 👾";
            }

            // Add game friend indicator
            if (relationship.GameRelationshipType() == discordpp::RelationshipType::Friend) {
                displayStr += " 🎮";
            }

            std::cout << displayStr << "\n";
        }
    }
}

```

