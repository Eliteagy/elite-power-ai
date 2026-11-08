# Guild availability
Context: Discord developer reference: Guild availability
[Source](intents-members-and-sharding-index.md) / [Previous source section](tracking-state.md) / [Following source section](sharding.md)
<a id="source-guild-availability"></a>

### Guild Availability

 When a bot user connects to the gateway, guilds the bot belongs to initially appear unavailable. The gateway automatically tries to reconnect for you. As guilds become available, the app receives [Guild Create](https://docs.discord.com/developers/events/gateway-events#guild-create) events.

