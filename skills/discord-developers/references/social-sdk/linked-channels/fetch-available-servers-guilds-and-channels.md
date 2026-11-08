# Fetch available servers guilds and channels
Context: Discord developer reference: Fetch available servers guilds and channels
[Source](linked-channels-index.md) / [Previous source section](creating-a-linked-channel.md) / [Following source section](saving-a-channel-link-selection.md)
<a id="source-fetch-available-servers-guilds-and-channels"></a>

### Fetch Available Servers (Guilds) and Channels

 The SDK includes helper calls for populating guild and channel pickers. [`Client::GetUserGuilds`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aac1ec02df6074ed9213ce230e6a42fe1) retrieves the user's Discord servers through the API and returns `GuildMinimal` entries with guild ID and name on success. [`Client::GetGuildChannels`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#adba1e5a83c219a9c4f6dab1657778017) takes a guildId and returns the `GuildChannel` objects the user can access in that guild:

```
struct GuildChannel {
    struct LinkedLobby {
        uint64_t applicationId;
        uint64_t lobbyId;
    };
    uint64_t id;
    std::string name;
    bool isLinkable;
    bool isViewableAndWriteableByAllMembers;
    std::optional<LinkedLobby> linkedLobby;
};

```

- `isLinkable` says whether that guild channel can be linked by the user. It accounts for channel validity, including text-channel status, age restriction, and existing lobby links, as well as the user's permissions. See the **Edit Lobby/Channel Link** endpoint for the complete requirements.
- `isViewableAndWriteableByAllMembers` reports whether Discord read/write access is restricted for any member or role, which can indicate a private channel. Discord enforces those permissions only inside the Discord client. In game, any lobby member can read and write through the link, even if they could not see the channel in Discord. **Warn the linking player that channel contents may be exposed to in-game players who lack Discord access.**

