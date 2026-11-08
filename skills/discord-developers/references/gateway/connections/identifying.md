# Identifying
Context: Discord developer reference: Identifying
[Source](connection-lifecycle-index.md) / [Previous source section](sending-heartbeats-heartbeat-requests.md) / [Following source section](identifying-ready-event.md)
<a id="source-identifying"></a> <a id="source-example-identify-payload"></a>

### Identifying

 Once the connection is open and heartbeats are running, send [Identify (opcode `2`)](https://docs.discord.com/developers/events/gateway-events#identify). Identify is the required initial Gateway handshake before most Gateway events can be sent or received. Apps are constrained by maximum concurrency, shown as `max_concurrency` in the [session start limit object](https://docs.discord.com/developers/events/gateway#session-start-limit-object), when identifying. Exceeding the limit causes Discord to return [Invalid Session (opcode `9`)](https://docs.discord.com/developers/events/gateway-events#invalid-session). After a valid Identify payload, Discord sends [Ready](https://docs.discord.com/developers/events/gateway-events#ready), indicating a successfully connected Gateway state. Ready is delivered as [Dispatch (opcode `0`)](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway-gateway-opcodes). Clients have a global limit of 1000 `IDENTIFY` calls to the websocket per 24 hours across all shards; `RESUME` calls are excluded. Reaching that limit terminates all active app sessions, resets the bot token, and emails the owner. The owner must then update the application with the new token.

###### Example Identify Payload

 The following is a minimal `IDENTIFY` payload. `IDENTIFY` can include additional session properties such as payload compression and initial presence. See [Identify Structure](https://docs.discord.com/developers/events/gateway-events#identify-identify-structure) for the full event shape.

```
{
  "op": 2,
  "d": {
    "token": "my_token",
    "intents": 513,
    "properties": {
      "os": "linux",
      "browser": "my_library",
      "device": "my_library"
    }
  }
}

```

