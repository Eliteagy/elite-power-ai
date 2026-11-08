# Receiving events
Context: Discord developer reference: Receiving events
[Source](connection-lifecycle-index.md) / [Previous source section](sending-events.md) / [Following source section](receiving-events-dispatch-events.md)
<a id="source-receiving-events"></a>

### Receiving Events

 Receiving Gateway events from Discord, such as [a reaction is added to a message](https://docs.discord.com/developers/events/gateway-events#message-reaction-add), is more common and somewhat more involved than sending events. Some events are delivered automatically, but most require the app to specify intents during [Identifying](https://docs.discord.com/developers/events/gateway#identifying). Intents are bitwise flags; combine them with OR (`|`) to choose which events, or event groups, Discord sends to the app. The [intents section](https://docs.discord.com/developers/events/gateway#gateway-intents) maps intents to events. Apps can also configure how events are delivered, including [encoding and compression](https://docs.discord.com/developers/events/gateway#encoding-and-compression) and whether [sharding should be enabled](https://docs.discord.com/developers/events/gateway#sharding)). All receivable connection events are listed in the [Gateway event documentation](https://docs.discord.com/developers/events/gateway-events#receive-events).

