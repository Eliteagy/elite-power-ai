# My welcome messages stopped firing
Context: Discord developer reference: My welcome messages stopped firing
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](what-are-privileged-intents.md) / [Previous source section](my-bot-s-commands-stopped-working.md) / [Following source section](i-got-a-disallowed-intents-error.md)
<a id="source-my-welcome-messages-stopped-firing"></a>

### ”My welcome messages stopped firing”

 Real-time welcome messages require `GUILD_MEMBER_ADD` events when users join. **Fix:** Enable and request the Guild Members intent, and show that the access is required for the app's stated functionality.

