# Guild presences intent capabilities
Context: Discord developer reference: Guild presences intent capabilities
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](who-does-this-apply-to.md) / [Previous source section](guild-members-intent-decision.md) / [Following source section](guild-presences-intent-alternatives.md)
<a id="source-guild-presences-intent"></a> <a id="source-what-you-get-with-the-intent-1"></a>

### Guild Presences Intent

### What you get with the intent

 The Guild Presences intent allows the app to receive `PRESENCE_UPDATE` events containing:
- `status`: The user state, such as online, idle, do not disturb, or offline.
- `activities`: The user's current playing, streaming, listening, or watching activity, including Rich Presence data.
- `client_status`: The active platform or platforms, such as desktop, mobile, or web.

