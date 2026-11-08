# The three privileged intents
Context: Discord developer reference: The three privileged intents
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](who-does-this-apply-to.md) / [Previous source section](who-does-this-apply-to.md) / [Following source section](guild-members-intent-capabilities.md)
<a id="source-the-three-privileged-intents"></a>

### The Three Privileged Intents

| Intent | What it controls |
| --- | --- |
| **Guild Presences** | Provides presence update events, including users going online or offline, status changes, and Rich Presence activity updates. |
| **Guild Members** | Provides guild member join, update, and leave events, and supports requesting complete member lists. |
| **Message Content** | Provides message object fields named `content`, `embeds`, `attachments`, `components`, and `poll` in Gateway events and API responses. This one differs from the others because it governs fields inside message objects rather than a specific event family. |

