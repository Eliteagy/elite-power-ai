# Handling a disconnect
Context: Discord developer reference: Handling a disconnect
[Source](connection-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](disconnecting.md) / [Following source section](initiating-a-disconnect.md)
<a id="source-handling-a-disconnect"></a>

#### Handling a Disconnect

 Because of Discord's architecture, disconnects are normal enough that apps should expect and handle them. A disconnect typically includes a [close code](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes), which helps decide whether to reconnect and [Resume](https://docs.discord.com/developers/events/gateway#resuming) or start over with a new Identify. After making that decision, choose one of these paths:
- If the app *can* reconnect and resume the previous session, reconnect with `resume_gateway_url` and `session_id` from the [Ready](https://docs.discord.com/developers/events/gateway-events#ready) event. See [Resuming](https://docs.discord.com/developers/events/gateway#resuming) for when and how to do this.
- If the app *cannot* reconnect **or the reconnect fails**, open a new connection with the URL from the initial [Get Gateway](https://docs.discord.com/developers/events/gateway#get-gateway) or [Get Gateway Bot](https://docs.discord.com/developers/events/gateway#get-gateway-bot) call. When resume is not possible, the app must identify again after opening the new connection.
 The full set of close codes is listed in [Response Codes](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes).

