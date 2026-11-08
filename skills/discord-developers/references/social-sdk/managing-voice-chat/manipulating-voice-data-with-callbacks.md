# Manipulating voice data with callbacks
Context: Discord developer reference: Manipulating voice data with callbacks
[Source](managing-voice-chat-index.md) / [Previous source section](excluding-krisp-to-reduce-installation-size.md) / [Following source section](in-place-audio-modification.md)
<a id="source-advanced-audio-processing"></a> <a id="source-manipulating-voice-data-with-callbacks"></a>

### Advanced Audio Processing

### Manipulating Voice Data with Callbacks

 For custom audio processing, call [`Client::StartCallWithAudioCallbacks`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#abcaa891769f9e912bfa0e06ff7221b05) to receive raw audio data. That path supports live sample changes and handoff to outside audio systems.

