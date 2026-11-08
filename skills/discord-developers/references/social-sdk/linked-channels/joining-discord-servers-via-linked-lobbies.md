# Joining discord servers via linked lobbies
Context: Discord developer reference: Joining discord servers via linked lobbies
[Source](linked-channels-index.md) / [Previous source section](putting-it-all-together.md) / [Following source section](platform-considerations.md)
<a id="source-joining-discord-servers-via-linked-lobbies"></a>

### Joining Discord Servers via Linked Lobbies

 After a lobby is connected to a Discord channel, the game can let players join the related Discord server directly. [`Client::JoinLinkedLobbyGuild`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a54ec764e72e168de419ac14e24e8fc60) creates a single-use invite for the current user and, on supported platforms, opens Discord so the user can accept it. That removes the need to distribute invite links manually. A possible in-game flow is:
1. A Discord server admin links one server channel to the game lobby
2. Lobby players are shown a “Join Discord Server” action in game
3. Clicking it makes the SDK create a unique invite and open Discord
4. The player accepts the invite and joins the Discord server
 Only linked Discord accounts can use this server-join flow. For provisional accounts, prompt the player to link their Discord account first.

```
const uint64_t lobbyId = 1234567890;

// Invite the user to join the Discord guild associated with the linked lobby
client->JoinLinkedLobbyGuild(
    lobbyId,
    // This is triggered when the user is using a provisional account, since
    // the user needs a real Discord account to join the Discord server, so you don't need
    // to implement a provisional user check on implementation.
    [] {
        // Show a message in your UI explaining that they need to link their Discord account
        // and/or step them through the process
        std::cout << "📝 User needs to link their Discord account\n";
    },
    // Called after the invite generation attempt completes, providing either a
    // successful result with the invite URL or an error if the operation failed.
    [](const discordpp::ClientResult &result, const std::string& inviteUrl) {
        if(result.Successful()) {
            std::cout << "✅ Discord invite generated successfully!\n";

            // On console platforms, you'll need to display the invite URL
            // for users to manually navigate to
            #ifdef CONSOLE_PLATFORM
            std::cout << "Join the Discord server at: " << inviteUrl << "\n";
            // Display this URL in your game's UI for the player to use
            #endif
        } else {
            std::cerr << "❌ Failed to generate Discord invite\n";
        }
    }
);

```

