# Consistency
Context: Discord developer reference: Consistency
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](nullable-and-optional-resource-fields.md) / [Following source section](user-agent.md)
<a id="source-consistency"></a>

### Consistency

 At Discord's scale, strict consistency cannot be guaranteed. Many API and service operations are [eventually consistent](https://en.wikipedia.org/wiki/Eventual_consistency). Client actions therefore cannot be serialized and may run in any order, or may not run. Under these constraints, Discord events may:
- Never reach a client
- Reach the client exactly once
- Reach each client up to N times
 Clients should process API results and events in an idempotent manner wherever possible.

