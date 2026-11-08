# My bot s commands stopped working
Context: Discord developer reference: My bot s commands stopped working
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](what-are-privileged-intents.md) / [Previous source section](test-and-verify.md) / [Following source section](my-welcome-messages-stopped-firing.md)
<a id="source-common-situations-and-what-to-do"></a> <a id="source-my-bots-commands-stopped-working"></a>

### Common situations and what to do

### ”My bot’s commands stopped working”

 If a prefix-command bot such as `!help` depended on Message Content, it can still receive `MESSAGE_CREATE`, but the `content` field is empty. The bot never sees the prefix. **Fix:** Move the feature to [slash commands](https://docs.discord.com/developers/gateway/developers/interactions/application-commands).

