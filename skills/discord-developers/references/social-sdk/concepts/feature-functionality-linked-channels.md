# Feature functionality linked channels
Context: Discord developer reference: Feature functionality linked channels
[Source](features-authentication-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication-feature-functionality.md) / [Previous source section](direct-messages-through-discord.md) / [Following source section](feature-functionality-voice-communications.md)
<a id="source-linked-channels-1"></a>

#### Linked Channels

 **Intended Use:** Link in-game group chats current to Discord text channels, enabling persistent conversations which flow between game platforms through Discord. **Complete User Flow:**
1. Player using Discord server admin & game chat admin permissions accesses channel linking option inside group chat interface
2. Channel selection interface opens showing available Discord servers/channels
3. Player selects appropriate text channel (with proper permissions)
4. System shows setup warning once linking to restricted channel
5. Link establishes successfully with confirmation
6. Messages flow bidirectionally between game and Discord
7. Persistent entrypoint shows linked channel info and management options
 **Negative Options to Resolve:**
- **Insufficient permissions:** Show clear error about channel management requirements
- **No available channels:** Provide guidance on creating or accessing appropriate channels
- **Link establishment failure:** Show retry options and clear error messaging
- **User wants to unlink:** Provide confirmation dialog and clean removal process
 These requirements are the baseline functionality standard. For a stronger player experience, review [Design Guidelines for Linked Channels](https://docs.discord.com/developers/discord-social-sdk/design-guidelines/linked-channels).

