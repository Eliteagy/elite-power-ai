# Noise suppression cancellation
Context: Discord developer reference: Noise suppression cancellation
[Source](managing-voice-chat-index.md) / [Previous source section](detecting-no-audio-input.md) / [Following source section](default-audio-processing-web-rtc.md)
<a id="source-noise-suppression--cancellation"></a>

### Noise Suppression & Cancellation

 The SDK has two levels of microphone processing: WebRTC-based defaults that stay enabled by default, plus optional Krisp noise cancellation for stronger filtering. Krisp can remove noise at higher quality, but it adds libraries and model assets that increase install size. For size-sensitive builds such as mobile, see Excluding Krisp to Reduce Installation Size to ship with only WebRTC defaults.

