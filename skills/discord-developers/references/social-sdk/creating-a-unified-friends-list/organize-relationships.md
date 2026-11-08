# Organize relationships
Context: Discord developer reference: Organize relationships
[Source](creating-a-unified-friends-list-index.md) / [Previous source section](fetch-relationships.md) / [Following source section](monitor-changes-to-users.md)
<a id="source-step-2-organize-relationships"></a>

### Step 2: Organize Relationships

 The [Unified Friends List](https://docs.discord.com/developers/discord-social-sdk/design-guidelines/unified-friends-list) design guidelines split the player's friends into three sections: `Online - GameTitle`, `Online - Elsewhere`, and `Offline`. Because this sample is a text console application, it uses emojis for friend status, but your game can use its own visual language for status and presence. Update `DisplayFriendsList` so it creates those sections and categorizes friends by status:
- Create three vectors to hold friends for each category.
- Exclude pending friends and blocked users.
- Add indicators for Discord friends, game friends, and provisional users.
- Categorize friends from their game and presence status.
- Sort each category alphabetically.
- Render each category separately.
 This example is illustrative only. Use efficient data structures and cache data where suitable to avoid performance issues in your game.

```
void DisplayFriendsList(std::shared_ptr<discordpp::Client> client) {
    // Create vectors for each section
    std::vector<std::string> inGame;
    std::vector<std::string> online;
    std::vector<std::string> offline;

    for (auto& relationship : client->GetRelationships()) {
        auto user = relationship.User();
        if (!user) {
            continue;
        }

        // Filter out pending friends and blocked users
        // You can display friend requests and blocked users in a different view to allow players to manage them in your game
        if (relationship.DiscordRelationshipType() != discordpp::RelationshipType::Friend) {
            continue;
        }

        std::string str;
        str += user->DisplayName();

        // Add Discord friend indicator
        // In a real game, please use the official Discord logo available in our design guidelines
        if (relationship.DiscordRelationshipType() == discordpp::RelationshipType::Friend) {
            str += " 👾";
        }

        // Add game friend indicator
        if (relationship.GameRelationshipType() == discordpp::RelationshipType::Friend) {
            str += " 🎮";
        }

        // Add provisional indicator
        if (user->IsProvisional()) {
            str += " (Provisional)";
        }

        // Categorize based on status
        if (user->GameActivity()) {
            // in game
            inGame.push_back("🟣 " + str);
        } else if (user->Status() != discordpp::StatusType::Offline) {
            // online
            online.push_back("🟢 " + str);
        } else {
            // offline
            offline.push_back("⚫ " + str);
        }
    }

    // Sort each category
    std::sort(inGame.begin(), inGame.end());
    std::sort(online.begin(), online.end());
    std::sort(offline.begin(), offline.end());

    // Display "Online - GameTitle" Friends
    std::cout << "\n=== Online - GameTitle (" << inGame.size() << ") ===\n";
    for (const auto& str : inGame) {
        std::cout << str << "\n";
    }

    // Display "Online - Elsewhere" Friends
    std::cout << "\n=== Online - Elsewhere (" << online.size() << ") ===\n";
    for (const auto& str : online) {
        std::cout << str << "\n";
    }

    // Display "Offline" Friends
    std::cout << "\n=== Offline (" << offline.size() << ") ===\n";
    for (const auto& str : offline) {
        std::cout << str << "\n";
    }
}

```

 After building and running the application, the friends list should be split into `Online - GameTitle`, `Online - Elsewhere`, and `Offline`.

