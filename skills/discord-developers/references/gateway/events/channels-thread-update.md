# Channels thread update
Context: Discord developer reference: Channels thread update
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](channels-channel-create.md) / [Previous source section](channels-thread-create.md) / [Following source section](channels-thread-delete.md)
<a id="source-thread-update"></a>

#### Thread Update

 Dispatched after a thread changes. The payload body is a [channel](https://docs.discord.com/developers/resources/channel#channel-object) object. Changes to `last_message_id` do not trigger this event; track last_message_id movement by listening for [Message Create](https://docs.discord.com/developers/events/gateway-events#message-create) events.

