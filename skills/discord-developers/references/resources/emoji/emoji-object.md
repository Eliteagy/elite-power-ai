# Emoji object
Context: Discord developer reference: Emoji object
[Source](../emoji-and-entitlements-index.md) / [Following source section](emoji-object-emoji-structure.md)
<a id="source-emoji-entitlement"></a> <a id="source-overview"></a> <a id="source-emoji-object"></a>

# Emoji, Entitlement

> Discord Developers reference. Original prose; identifiers preserved verbatim.

## Overview

Covers: Emoji Object; Entitlement Object.

## Emoji Object

Emoji management routes use different rate limit behavior from the standard convention. They are constrained per guild to reduce abuse, so the limits reported by the API can be wrong and 429 responses may still occur.

