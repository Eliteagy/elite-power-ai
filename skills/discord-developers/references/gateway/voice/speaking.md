# Speaking
Context: Discord developer reference: Speaking
[Source](voice-transport-and-interpolation-index.md) / [Previous source section](transport-encryption-modes.md) / [Following source section](voice-data-interpolation.md)
<a id="source-speaking"></a> <a id="source-example-speaking-payload"></a>

### Speaking

 Speaking updates change the client **speaking modes**. Set the mode with an [Opcode 5 Speaking](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) payload. Before transmitting audio, the client must send this payload at least once so the SSRC is updated and the initial speaking mode is set. The flags below can be combined as a bitwise mask; for instance, `5` means priority plus voice. Use a nonzero speaking mode when audio will be sent.
| Flag | Meaning | Value |
| --- | --- | --- |
| Microphone | Normal transmission of voice audio | `1 << 0` |
| Soundshare | Sends context audio for video without showing a speaking indicator | `1 << 1` |
| Priority | Priority speaker mode, which lowers audio from other speakers | `1 << 2` |

###### Example Speaking Payload

```
{
  "op": 5,
  "d": {
    "speaking": 5,
    "delay": 0,
    "ssrc": 1
  }
}

```

 Send at least one [Opcode 5 Speaking](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) payload before transmitting voice data; otherwise Discord disconnects the client with an invalid SSRC error. Bots using the voice gateway should set `delay` to `0`.

