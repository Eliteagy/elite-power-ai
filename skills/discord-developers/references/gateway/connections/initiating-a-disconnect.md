# Initiating a disconnect
Context: Discord developer reference: Initiating a disconnect
[Source](connection-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](disconnecting.md) / [Previous source section](handling-a-disconnect.md) / [Following source section](resuming.md)
<a id="source-initiating-a-disconnect"></a>

#### Initiating a Disconnect

 Closing the gateway connection with close code `1000` or `1001` invalidates the session and makes the bot appear offline. If the app only closes the TCP connection or uses another close code, the session remains active and times out after a few minutes. That can help when [Resuming](https://docs.discord.com/developers/events/gateway#resuming) the previous session.

