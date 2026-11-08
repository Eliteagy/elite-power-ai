# Respect user privacy
Context: Discord developer reference: Respect user privacy
[Source](design-patterns-index.md) / [Previous source section](player-action-and-presence-visibility.md) / [Following source section](deliver-a-quality-experience.md)
<a id="source-respect-user-privacy"></a>

### Respect user privacy

- For Activity sessions that match users across multiple servers, default to anonymized usernames and avatars.
- Populate Discord personal identifiers in the Activity only after user confirmation.
- Use those identifiers only when the viewers already have access through the server or DM.

---

