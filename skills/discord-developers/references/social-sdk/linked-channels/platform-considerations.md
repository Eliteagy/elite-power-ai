# Platform considerations
Context: Discord developer reference: Platform considerations
[Source](linked-channels-index.md) / [Previous source section](joining-discord-servers-via-linked-lobbies.md) / [Following source section](creating-a-unified-friends-list.md)
<a id="source-platform-considerations"></a>

### Platform Considerations

- **Desktop**: The SDK opens either the Discord client or a web browser with the invite
- **Console**: Console platforms cannot open Discord directly, so show the invite URL in the game UI for use on another device
 Server admins cannot limit this join path to a subset of linked-lobby players. Any player in the linked lobby can create a server invite, independent of lobby permissions.
Tell players to link channels only in servers they are comfortable letting the lobby join, or provide game-side controls that disable this feature for selected lobbies.

---

