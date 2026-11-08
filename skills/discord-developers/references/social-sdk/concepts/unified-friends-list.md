# Unified friends list
Context: Discord developer reference: Unified friends list
[Source](features-authentication-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication-feature-functionality.md) / [Previous source section](feature-functionality-rich-presence.md) / [Following source section](direct-messages-through-discord.md)
<a id="source-unified-friends-list"></a>

#### Unified Friends List

 **Intended Use:** Combine Discord friends and in-game relationships into one single, organized friends list which shows comprehensive social connections. **Example Complete User Flow:**
1. Player opens their in-game friends list
2. Game UI quickly populates friends in an organized list showing:
  - In-game friends (always visible)
  - “Online Elsewhere” section with Discord friends not currently in-game
  - Appropriate status indicators and Discord badges

3. Player interacts with friends in list (message, invite, block, view profile)
4. Friends list updates dynamically in real time as statuses change
5. Player can add/remove friends through the interface
 **Negative Options to Resolve:**
- **Friend removal:** Handle removal across both game and Discord systems appropriately
- **Loading failures:** Show loading states plus error messages for failed friend data retrieval
- **Special characters**: Non-standard characters in Discord usernames populate as expected.
- **Unlinking Discord**: Player’s in-game friends list removes Discord friend entries once they unlink their Discord account
 These requirements are the baseline functionality standard. For a stronger player experience, review [Design Guidelines for Unified Friends List](https://docs.discord.com/developers/discord-social-sdk/design-guidelines/unified-friends-list).

