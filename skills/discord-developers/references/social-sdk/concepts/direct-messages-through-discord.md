# Direct messages through discord
[Source](features-authentication-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication-feature-functionality.md) / [Previous source section](unified-friends-list.md) / [Following source section](feature-functionality-linked-channels.md)

<a id="source-direct-messages-through-discord"></a>

#### Direct Messages through Discord

 **Intended Use:** Enable seamless messaging between players across game platforms current through Discord, maintaining conversation continuity. **Complete User Flow:**
1. Player selects friend to message from one in-game friends list or other interface
2. Message interface opens showing chat history (if available)
3. Player composes and sends message
4. Message appears in both this game interface and Discord (for linked users)
5. Messages from Discord appear in-game with Discord visual notation
6. Conversation continues seamlessly across platforms
 **Negative Options to Resolve:**
- **Message delivery failure:** Show retry options and clear error states
- **Unsupported media:** Display placeholder with external link icon for rich media
- **Blocked users:** Respect Discord blocking relationships and show appropriate messaging
- **Network issues:** Queue messages locally and sync once connection restored
 These requirements are the baseline functionality standard. For a stronger player experience, review [Design Guidelines for Direct Messages](https://docs.discord.com/developers/discord-social-sdk/design-guidelines/direct-messages).

<a id="source-direct-messages-through-discord-1"></a>

#### Direct Messages through Discord

 Once you’ve chosen to integrate Direct Messages through Discord inside your game, **Direct Messages must be identifiable as coming from Discord,** plus **players must know once their messages are showing up in Discord.** **Conveyance Requirements:**
- Mark cross-platform DMs as Discord-specific with visual cues, such as a Discord logo/badge beside the sender name or hover text explaining the message source.
- Players must know once their messages are showing up in Discord through clear visual feedback once composing or sending messages
- The messaging interface must indicate the cross-platform nature for the conversation (e.g., “This conversation syncs with Discord” or similar messaging)
