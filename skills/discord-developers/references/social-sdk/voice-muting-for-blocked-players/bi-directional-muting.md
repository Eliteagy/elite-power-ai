# Bi directional muting
Context: Discord developer reference: Bi directional muting
[Source](voice-muting-for-blocked-players-index.md) / [Previous source section](block-signals-may-come-from-outside-discord.md) / [Following source section](populate-the-mute-list.md)
<a id="source-bi-directional-muting"></a>

### Bi-Directional Muting

 [`Call::SetLocalMute`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Call.html#aaf8e7728b15da5d1be8d8b4258225171) affects only the local listener. If A calls it, A no longer hears B, but B can still hear A. Full muting requires both clients to call `SetLocalMute` for the other participant. Each player may know about different block signals, so the guide uses lobby member metadata as the shared visibility layer: every player writes their own `mute_list`, all lobby members can inspect it, and a client can mute another participant when that participant has listed them, even when the original block data came from elsewhere.

---

