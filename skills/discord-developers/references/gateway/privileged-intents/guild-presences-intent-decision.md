# Guild presences intent decision
Context: Discord developer reference: Guild presences intent decision
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](who-does-this-apply-to.md) / [Previous source section](guild-presences-intent-alternatives.md) / [Following source section](message-content-intent-capabilities.md)
<a id="source-decision-checklist-1"></a>

### Decision checklist

1. Does the bot use presence data for a real feature, or only show it in a "user info" command?
2. Would `approximate_presence_count` satisfy the feature instead of per-user presence access?
3. Is this intent being requested for a specific core dependency, or merely "just in case"?

---

