# Overview audio logging
Context: Discord developer reference: Overview audio logging
[Source](logging-api-and-unicode-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](overview-voice-logging.md) / [Following source section](overview-client-tools.md)
<a id="source-audio-logging"></a>

### Audio Logging

 For acoustic echo cancellation (AEC) investigations, call [`Client::SetAecDump`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a3a05b2cafaa546d915a5249c63f4059f). It records diagnostic input and output waveform data, which helps analyze echo, feedback, and other audio-processing issues. [`Client::SetAecDump`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a3a05b2cafaa546d915a5249c63f4059f) toggles AEC diagnostic capture. When enabled, those waveform files are written to the same log directory configured with [`Client::SetLogDir`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a23bd5802dfa3072201ea864ee839c001).

```
// Enable AEC diagnostic recording
client->SetAecDump(true);

// ... perform voice chat operations to reproduce the issue ...

// Disable AEC diagnostic recording when done
client->SetAecDump(false);

```

 **When to use:**
- Players report echo or feedback in voice chat
- Audio quality problems appear connected to echo cancellation
- You are evaluating AEC behavior across different environments
- Debugging audio processing pipeline issues
 AEC dumps store raw waveform data and can grow quickly. Turn the capture off after you have enough material to inspect.

