# Block signals may come from outside discord
Context: Discord developer reference: Block signals may come from outside discord
[Source](voice-muting-for-blocked-players-index.md) / [Previous source section](discord-blocking-does-not-silence-voice.md) / [Following source section](bi-directional-muting.md)
<a id="source-block-signals-may-come-from-outside-discord"></a>

### Block Signals May Come From Outside Discord

 A game can learn about blocks from systems other than Discord, such as game-level or platform-level block lists. When that happens, the client has no Discord relationship record to query. Send the needed block data to clients by another route, for example through lobby member metadata.

