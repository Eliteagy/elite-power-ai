# Receive events invalid session
Context: Discord developer reference: Receive events invalid session
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](receive-events.md) / [Previous source section](receive-events-reconnect.md) / [Following source section](application-command-permissions-update.md)
<a id="source-invalid-session"></a> <a id="source-example-gateway-invalid-session"></a>

#### Invalid Session

 Sent for at least three different conditions:
- the gateway could not start a session after receiving an [Opcode 2 Identify](https://docs.discord.com/developers/events/gateway-events#identify)
- the gateway could not resume an earlier session after receiving an [Opcode 6 Resume](https://docs.discord.com/developers/events/gateway-events#resume)
- the gateway invalidated an active session and needs the client to respond
 The nested `d` value is a boolean showing whether the session may be resumable. See [Connecting](https://docs.discord.com/developers/events/gateway#connecting) and [Resuming](https://docs.discord.com/developers/events/gateway#resuming) for details.

###### Example Gateway Invalid Session

```
{
  "op": 9,
  "d": false
}

```

