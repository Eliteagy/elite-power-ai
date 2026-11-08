# Messages message update
Context: Discord developer reference: Messages message update
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](messages.md) / [Previous source section](messages-message-create.md) / [Following source section](messages-message-delete.md)
<a id="source-message-update"></a>

#### Message Update

 Dispatched after a message is updated. The payload body is a [message](https://docs.discord.com/developers/resources/message#message-object) object with the same extra fields as [MESSAGE_CREATE](https://docs.discord.com/developers/events/gateway-events#message-create). In message updates, `tts` is always false.

