# Voice data interpolation
Context: Discord developer reference: Voice data interpolation
[Source](voice-transport-and-interpolation-index.md) / [Previous source section](speaking.md) / [Following source section](resuming-voice-connection.md)
<a id="source-voice-data-interpolation"></a>

### Voice Data Interpolation

 When outgoing data pauses, do not just stop packet delivery. First transmit five silence frames (`0xF8, 0xFF, 0xFE`) so later transmissions do not trigger unwanted Opus interpolation.

