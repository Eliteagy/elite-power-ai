# Privileged intents gateway restrictions
Context: Discord developer reference: Privileged intents gateway restrictions
[Source](intents-members-and-sharding-index.md) / [Owning endpoint, event, object or procedure conditions](privileged-intents.md) / [Previous source section](privileged-intent-access-review.md) / [Following source section](privileged-intents-http-restrictions.md)
<a id="source-gateway-restrictions"></a>

#### Gateway Restrictions

 Privileged intents control which Gateway events the app may receive. With **API v8** and above, every intent, privileged or not, must be listed in the `intents` parameter when Identifying. If the app passes a privileged intent in `intents` without configuring it in the app settings or receiving verification approval, Discord closes the Gateway connection with a ([`4014` close code](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes)). With **API v6**, the app receives events for privileged intents it has configured and is authorized for *without* passing those intents in `intents` while Identifying. Events under `GUILD_PRESENCES` and `GUILD_MEMBERS` are disabled by default on every API version.

