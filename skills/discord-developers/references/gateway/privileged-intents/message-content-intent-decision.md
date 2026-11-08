# Message content intent decision
Context: Discord developer reference: Message content intent decision
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](who-does-this-apply-to.md) / [Previous source section](intent-free-interaction-alternatives.md) / [Following source section](who-does-this-apply-to-further-reading.md)
<a id="source-decision-checklist-2"></a>

### Decision checklist

1. Does the bot rely on prefix commands such as `!help` or `?play` that could become slash commands?
2. Could users explicitly trigger the feature through a command, context menu, or other interaction?
3. Does the bot need the message's content, or only the fact that a message was created?
4. If the intended use is moderation, does the bot provide capabilities beyond the AutoMod API? Recreating functionality already supported by the AutoMod API generally is not a strong reason to grant access.

