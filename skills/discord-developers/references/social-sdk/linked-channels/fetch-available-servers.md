# Fetch available servers
Context: Discord developer reference: Fetch available servers
[Source](linked-channels-index.md) / [Previous source section](set-up-message-handling.md) / [Following source section](link-channel-to-lobby.md)
<a id="source-step-2-fetch-available-servers"></a>

### Step 2: Fetch Available Servers

```
void FetchDiscordServers(std::shared_ptr<discordpp::Client> client) {
    client->GetUserGuilds([](auto result, const auto& guilds) {
        if (!result.Successful()) {
            std::cout << "❌ Failed to fetch guilds\n";
            return;
        }

        for (const auto& guild : guilds) {
            std::cout << "📁 Guild: " << guild.name << "\n";
            // Store guild IDs for later use
            SaveGuildId(guild.id);
        }
    });
}

void FetchChannelsForGuild(
    std::shared_ptr<discordpp::Client> client,
    uint64_t guildId
) {
    client->GetGuildChannels(guildId, [](auto result, const auto& channels) {
        if (!result.Successful()) return;

        for (const auto& channel : channels) {
            if (channel.isLinkable) {
                std::cout << "  📝 Channel: " << channel.name;
                if (!channel.isViewableAndWriteableByAllMembers) {
                    std::cout << " (Private)";
                }
                std::cout << "\n";
            }
        }
    });
}

```

