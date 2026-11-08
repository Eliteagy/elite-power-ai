# Message reference object voice messages
Context: Discord developer reference: Message reference object voice messages
[Source](message-objects-and-embeds-index.md) / [Owning endpoint, event, object or procedure conditions](message-reference-structure.md) / [Previous source section](message-reference-content-attribution.md) / [Following source section](message-snapshot-structure.md)
<a id="source-voice-messages"></a>

#### Voice Messages

 Voice messages are messages carrying the `IS_VOICE_MESSAGE` flag. They have these properties.
- They cannot be edited.
- Exactly 1 audio attachment is allowed. Content, stickers, and similar extra payloads are not allowed.
- The [attachment](https://docs.discord.com/developers/resources/message#attachment-object) includes extra fields: `duration_secs` and `waveform`. The attachment `Content-Type` must start with `audio/` for these fields to apply.
 `waveform` previews the full voice message with 1 byte per datapoint encoded in base64. Clients sample at most once every 100 milliseconds and downsample so the waveform has no more than 256 datapoints. As of 2023-04-14, clients upload a 1 channel, 48000 Hz, 32kbps Opus stream in an OGG container. Encoding and waveform details are implementation details that may change without warning or documentation.

