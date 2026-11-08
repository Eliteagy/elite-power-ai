# Detecting no audio input
Context: Discord developer reference: Detecting no audio input
[Source](managing-voice-chat-index.md) / [Previous source section](voice-activity-detection.md) / [Following source section](noise-suppression-cancellation.md)
<a id="source-detecting-no-audio-input"></a>

### Detecting No Audio Input

 The SDK can alert you when the microphone is not receiving audio, such as when the selected device is wrong, the OS has muted input, or the hardware is failing. Your game can then show a hint that the mic appears silent instead of leaving the player without feedback.
- [`Client::SetNoAudioInputThreshold`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ab33f5d70461ee7590b6f3cfccaeb6df4) - dBFS cutoff used to classify input as silent. The range is `[-100.0, 100.0]`; the default `-100.0` disables detection. A value such as `-60.0` enables it.
- [`Client::SetNoAudioInputCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a479e60724bf6b0b39b555c1ff8489b9e) - Invoked with `bool inputDetected` when mic input crosses the threshold, in either direction from silent to active or active to silent.

```
// Enable detection at -60 dBFS
client->SetNoAudioInputThreshold(-60.0f);

client->SetNoAudioInputCallback([](bool inputDetected) {
    if (!inputDetected) {
        // Show a UI hint: "Your mic appears silent — check your device settings."
    } else {
        // Mic is receiving audio again; clear the hint.
    }
});

```

