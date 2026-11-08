# Support drop in drop out behavior
Context: Discord developer reference: Support drop in drop out behavior
[Source](design-patterns-index.md) / [Previous source section](keep-load-times-as-low-as-possible.md) / [Following source section](cross-platform-support.md)
<a id="source-support-drop-in-drop-out-behavior"></a>

### Support drop-in, drop-out behavior

- Activities are easy to discover and low-friction to join, so users may enter while an experience is already underway. Give late joiners something useful to do, even if they only spectate until participation would not disrupt the session. Users may also leave suddenly or become afk (away from keyboard), so handle those cases cleanly.
- Support users who joined the call but have not started playing or interacting yet. Let them "spectate" active users, which is especially useful when the Activity has an ideal participant count.
 (Figure: Support drop-in, drop-out behavior in your Activity)

