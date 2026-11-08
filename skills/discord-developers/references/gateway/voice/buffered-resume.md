# Buffered resume
Context: Discord developer reference: Buffered resume
[Source](voice-transport-and-interpolation-index.md) / [Previous source section](resuming-voice-connection.md) / [Following source section](ip-discovery.md)
<a id="source-buffered-resume"></a> <a id="source-example-message-with-sequence-number"></a>

### Buffered Resume

 In voice gateway version 8 and later, the gateway can replay buffered messages that were missed during resume. To make that possible, messages that may need replay include a sequence number.

###### Example Message With Sequence Number

```
{
  "op": 5,
  "d": {
    "speaking": 0,
    "delay": 0,
    "ssrc": 110
  },
  "seq": 10
}

```

 A client on voice gateway version 8 must put the last received sequence number in the data `d` object as `seq_ack` for both [Opcode 3 Heartbeat](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) and [Opcode 7 Resume](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice). If the client has not received any sequence-numbered messages, it may leave `seq_ack` out or send `-1`. The gateway uses a fixed-width sequence number and wraps it when needed. Because voice gateway messages are ordered, the client only has to remember the most recent sequence number. After a successful resume, the voice gateway sends [Opcode 9 Resumed](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) and re-sends messages the client missed. Resume can fail when the session buffer no longer contains a missed message; in that situation the session closes and the client should reconnect with the [Connecting](https://docs.discord.com/developers/topics/voice-connections#connecting-to-voice) flow.

