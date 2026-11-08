# Heartbeating
Context: Discord developer reference: Heartbeating
[Source](voice-handshake-and-encryption-index.md) / [Previous source section](establishing-a-voice-websocket-connection.md) / [Following source section](establishing-a-voice-udp-connection.md)
<a id="source-heartbeating"></a> <a id="source-example-hello-payload"></a> <a id="source-example-heartbeat-payload-since-v8"></a> <a id="source-example-heartbeat-payload-below-v8"></a> <a id="source-example-heartbeat-ack-payload-since-v8"></a> <a id="source-example-heartbeat-ack-payload-below-v8"></a>

### Heartbeating

 To keep the WebSocket connection alive, continue sending heartbeats at the interval supplied by [Opcode 8 Hello](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice):

###### Example Hello Payload

```
{
  "op": 8,
  "d": {
    "heartbeat_interval": 41250,
  }
}

```

 After [Opcode 8 Hello](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) arrives, send [Opcode 3 Heartbeat](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) with an integer nonce on each elapsed interval:

###### Example Heartbeat Payload since V8

```
{
  "op": 3,
  "d": {
    "t": 1501184119561,
    "seq_ack": 10
  }
}

```

 For voice gateway version 8 and later, heartbeat messages must include `seq_ack`, which carries the sequence number of the last numbered gateway message received. See [Buffered Resume](https://docs.discord.com/developers/topics/voice-connections#buffered-resume) for details.

###### Example Heartbeat Payload below V8

```
{
  "op": 3,
  "d": 1501184119561
}

```

 Discord replies with an [Opcode 6 Heartbeat ACK](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) containing the nonce that was sent:

###### Example Heartbeat ACK Payload since V8

```
{
  "op": 6,
  "d": {
    "t": 1501184119561
  }
}

```

###### Example Heartbeat ACK Payload below V8

```
{
  "op": 6,
  "d": 1501184119561
}

```

