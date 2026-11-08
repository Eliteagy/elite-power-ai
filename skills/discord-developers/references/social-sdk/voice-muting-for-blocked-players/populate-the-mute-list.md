# Populate the mute list
Context: Discord developer reference: Populate the mute list
[Source](voice-muting-for-blocked-players-index.md) / [Previous source section](bi-directional-muting.md) / [Following source section](client-side.md)
<a id="source-step-1-populate-the-mute-list"></a>

### Step 1: Populate the Mute List

 Both methods store a `mute_list` entry in each lobby member's metadata. Its value is a comma-separated set of Discord user IDs that the player should not hear in voice. The distinction between the methods is how those IDs are collected.

