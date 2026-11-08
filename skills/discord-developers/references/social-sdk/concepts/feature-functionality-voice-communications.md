# Feature functionality voice communications
Context: Discord developer reference: Feature functionality voice communications
[Source](features-authentication-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication-feature-functionality.md) / [Previous source section](feature-functionality-linked-channels.md) / [Following source section](discord-account-linking.md)
<a id="source-voice-communications"></a>

#### Voice Communications

 **Intended Use:** Provide high-quality voice chat integration which works seamlessly between game platforms through Discord. **Complete User Flow:**
1. Player joins voice-enabled game session/party
2. Voice interface becomes available with Discord-powered audio
3. Player can mute/unmute, adjust volume, see speaking indicators
4. Voice streams work for individual user accounts with clear audio quality
5. Player can leave voice
 **Negative Options to Resolve:**
- **Voice server unavailable:** Provide clear error messaging and retry mechanisms
- **User leaves voice:** Clean up voice states and update interfaces appropriately

