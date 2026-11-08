# Resuming voice connection
Context: Discord developer reference: Resuming voice connection
[Source](voice-transport-and-interpolation-index.md) / [Previous source section](voice-data-interpolation.md) / [Following source section](buffered-resume.md)
<a id="source-resuming-voice-connection"></a> <a id="source-example-resume-connection-payload-since-v8"></a> <a id="source-example-resume-connection-payload-before-v8"></a> <a id="source-example-resumed-payload"></a>

### Resuming Voice Connection

 After the client notices that its connection was lost, it should create another WebSocket connection. Once that connection is open, send an [Opcode 7 Resume](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) payload:

###### Example Resume Connection Payload Since V8

```
{
  "op": 7,
  "d": {
    "server_id": "41771983423143937",
    "session_id": "my_session_id",
    "token": "my_token",
    "seq_ack": 10
  }
}

```

###### Example Resume Connection Payload Before V8

```
{
  "op": 7,
  "d": {
    "server_id": "41771983423143937",
    "session_id": "my_session_id",
    "token": "my_token"
  }
}

```

 On success, the Voice server answers with [Opcode 9 Resumed](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice), indicating that the client session has resumed:

###### Example Resumed Payload

```
{
  "op": 9,
  "d": null
}

```

 If resuming fails, such as when the session is invalid, the WebSocket closes with the relevant [close event code](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice-voice-close-event-codes). After that, reconnect by following the [Connecting](https://docs.discord.com/developers/topics/voice-connections#connecting-to-voice) flow.

