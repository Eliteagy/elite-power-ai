# Privileged intents HTTP restrictions
Context: Discord developer reference: Privileged intents HTTP restrictions
[Source](intents-members-and-sharding-index.md) / [Owning endpoint, event, object or procedure conditions](privileged-intents.md) / [Previous source section](privileged-intents-gateway-restrictions.md) / [Following source section](message-content-intent.md)
<a id="source-http-restrictions"></a>

#### HTTP Restrictions

 Privileged intents can also limit which [HTTP API](https://docs.discord.com/developers/reference#http-api) endpoints the app may call and what data it receives. For example, using [List Guild Members](https://docs.discord.com/developers/resources/guild#list-guild-members) requires enabling `GUILD_MEMBERS`, with approval if the app is eligible for verification. HTTP API restrictions are separate from Gateway restrictions and do not depend on which intents the app sends in `intents` when Identifying.

