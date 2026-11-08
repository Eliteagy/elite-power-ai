# Path a remove the dependency
Context: Discord developer reference: Path a remove the dependency
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](what-are-privileged-intents.md) / [Previous source section](decide-whether-to-adopt-an-alternative-or-apply-for-access.md) / [Following source section](path-b-apply-for-privileged-intent-access.md)
<a id="source-path-a-remove-the-dependency"></a>

### Path A: Remove the dependency

 If the app can deliver the same feature without a Privileged Intent, remove the dependency. This path avoids review submissions, yearly renewal, and the risk of losing access. Common migrations include:
- **Text commands to slash commands**: Many Message Content requests come from prefix-command bots. [Slash commands](https://docs.discord.com/developers/interactions/application-commands) are the preferred replacement and do not need privileged intents.
- **Full member list to on-demand lookups**: If the app stores all server members but uses only a small number, fetch individual members through the API when needed instead.
 For more replacement patterns, read [You Might Not Need a Privileged Intent](https://docs.discord.com/developers/gateway/you-might-not-need-a-privileged-intent).

