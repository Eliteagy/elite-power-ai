# Guild members intent decision
Context: Discord developer reference: Guild members intent decision
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](who-does-this-apply-to.md) / [Previous source section](guild-members-intent-alternatives.md) / [Following source section](guild-presences-intent-capabilities.md)
<a id="source-decision-checklist"></a>

### Decision checklist

 Ask yourself these questions:
1. Does the app need information about all members, or only particular members that can be fetched by ID or search?
2. Does the app need live join, leave, or update events, or can it request member data when a user interacts with the bot through interactions?
 If the answer is closer to "particular members" and "on demand," the Guild Members intent is probably unnecessary because REST endpoints and interaction payloads cover those needs.

---

