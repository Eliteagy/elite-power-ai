# Resuming
Context: Discord developer reference: Resuming
[Source](connection-lifecycle-index.md) / [Previous source section](initiating-a-disconnect.md) / [Following source section](preparing-to-resume.md)
<a id="source-resuming"></a>

### Resuming

 When an app disconnects, Discord provides a reconnect and resume process that can replay lost events from the last received sequence number. After Resume succeeds, the app receives missed events as if the connection had stayed open. Unlike a new connection, Resume does **not** require Identify again. Apps should try to resume in these cases:
1. It receives a [Reconnect (opcode `7`)](https://docs.discord.com/developers/events/gateway-events#reconnect) event
2. It disconnects with a close code that permits reconnecting. The [Opcodes and Status Codes](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes) documentation lists close codes.
3. It disconnects without receiving *any* close code.
4. It receives [Invalid Session (opcode `9`)](https://docs.discord.com/developers/events/gateway-events#invalid-session) with `d` set to `true`. This is uncommon but possible.

