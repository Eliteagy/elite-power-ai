# Customizing rich presence
Context: Discord developer reference: Customizing rich presence
[Source](setting-rich-presence-index.md) / [Previous source section](understanding-rich-presence.md) / [Following source section](setting-an-invite-image.md)
<a id="source-customizing-rich-presence"></a>

### Customizing Rich Presence

 Discord renders Rich Presence using three major pieces:

```
Playing "Your Game Name"          <- Line 1: Game name (automatic)
Capture the Flag | 2 - 1          <- Line 2: Details field
In a group (2 of 3)               <- Line 3: State + Party info

```

 Lines 2 and 3 are configurable; the mapping is:
- Line 1, `Playing "game name"`, comes from the Discord name of your game or application.
- Line 2, `Capture the flag | 2 - 1`, comes from the activity `details` field and should usually describe the current player action. Dynamic values, such as match score, can go here.
- Line 3, `In a group (2 of 3)`, describes the player's *party*. A “Party” is a player group sharing a context such as a lobby, server, or team. The `state` field provides `In a group`; the activity party field provides `(2 of 3)` and represents current and maximum party size.
 This diagram maps the visual fields: (Figure: Graphical representation of the legend for rich presence details) For design advice, see the [Rich Presence best practices guide](https://docs.discord.com/developers/rich-presence/best-practices).

---

