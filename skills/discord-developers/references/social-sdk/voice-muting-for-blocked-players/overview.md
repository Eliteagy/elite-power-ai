# Overview
Context: Discord developer reference: Overview
[Source](voice-muting-for-blocked-players-index.md) / [Previous source section](voice-muting-for-blocked-players.md) / [Following source section](prerequisites.md)
<a id="source-overview"></a>

### Overview

 This guide will help you:
- Know that blocking someone does not, by itself, mute their voice audio
- Build a per-player mute list from Discord block relationships on the client, or from your game server on the server side
- Use one shared mute-application path after either mute-list source has populated the data
- Meet the bi-directional mute requirement, so if A blocks B, audio is muted both ways

