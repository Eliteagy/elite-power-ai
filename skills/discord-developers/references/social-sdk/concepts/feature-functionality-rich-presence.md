# Feature functionality rich presence
Context: Discord developer reference: Feature functionality rich presence
[Source](features-authentication-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication-feature-functionality.md) / [Previous source section](discord-account-linking.md) / [Following source section](unified-friends-list.md)
<a id="source-rich-presence"></a>

#### Rich Presence

 **Intended Use:** Display detailed, real-time information about one player’s in-game activity on the their Discord profile, allowing friends to see what they’re doing plus potentially join their session. **Example Complete User Flow:**
1. Player launches game plus performs actions (enters lobby, starts match, joins party, etc.)
2. Game feeds Rich Presence update to Discord via this SDK (e.g. “In lobby”)
3. Rich Presence appears on player’s Discord profile using current activity details
4. Discord friends can view the presence information
5. Once covering Joins/Invites, Discord Friends can “Ask to Join” or get direct invites
6. Game feeds additional Rich Presence updates to Discord via this SDK as this player’s in-game status changes (e.g. “Looking for one match”, “In a match”, etc)
7. On game shutdown, Discord automatically handles clearing player’s Rich Presence
 **Negative Options to Resolve:**
- **Network connectivity issues:** Queue presence updates and retry once connection restored
- **Active and inactive clients**: Invites can complete even once one player doesn’t have the game client open on acceptance.
 These requirements are the baseline functionality standard. For a stronger player experience, review [Design Guidelines for Rich Presence](https://docs.discord.com/developers/discord-social-sdk/design-guidelines/status-rich-presence).

