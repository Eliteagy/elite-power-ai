# Guild members intent capabilities
Context: Discord developer reference: Guild members intent capabilities
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](who-does-this-apply-to.md) / [Previous source section](the-three-privileged-intents.md) / [Following source section](guild-members-intent-alternatives.md)
<a id="source-guild-members-intent"></a> <a id="source-what-you-get-with-the-intent"></a>

### Guild Members Intent

### What you get with the intent

 The Guild Members intent enables three broad capabilities:
- **Member events via the Gateway:** `GUILD_MEMBER_ADD`, `GUILD_MEMBER_UPDATE`, and `GUILD_MEMBER_REMOVE` are sent when users join, change profile or role data, or leave a server.
- **Full member list:** The app can request every member in a server through the Gateway [`Request Guild Members` opcode](https://docs.discord.com/developers/events/gateway-events#request-guild-members) or the [List Guild Members API](https://docs.discord.com/developers/resources/guild#list-guild-members) endpoint.

