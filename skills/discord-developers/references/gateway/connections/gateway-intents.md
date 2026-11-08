# Gateway intents
Context: Discord developer reference: Gateway intents
[Source](connection-lifecycle-index.md) / [Source](intents-members-and-sharding-index.md) / [Previous source section](preparing-to-resume.md) / [Previous source section](list-of-intents.md)
<a id="source-gateway-intents"></a>

### Gateway Intents
Stateful apps can become costly to maintain when a Gateway connection delivers large volumes of data, especially at scale. Gateway intents reduce that workload. Intents are bitwise values supplied in the `intents` parameter while [Identifying](https://docs.discord.com/developers/events/gateway#identifying), and each maps to a related group of events. For example, the event sent when a guild is created (`GUILD_CREATE`) and the event sent when a channel is updated (`CHANNEL_UPDATE`) both require the `GUILDS (1 << 0)` intent listed below. If an intent is omitted during identify, the app receives none of the Gateway events tied to that intent. Intents are optional on the v6 gateway and required starting with v8. There are two intent categories:
- **Standard intents** can be supplied without extra permissions or configuration.
- [**Privileged intents**](https://docs.discord.com/developers/events/gateway#privileged-intents) must be enabled for the app in the Developer Portal before they are passed. Verified apps, required for apps in 100+ guilds, need approval for the intent after verification before use. The [section below](https://docs.discord.com/developers/events/gateway#privileged-intents) explains privileged intents in more detail.
 Discord closes the app connection if it sends invalid intents ([`4013` close code](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes)) or sends a privileged intent that has not been configured or approved for the app ([`4014` close code](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes)).

