# Key audio processing points
Context: Discord developer reference: Key audio processing points
[Source](managing-voice-chat-index.md) / [Previous source section](external-audio-pipeline-integration.md) / [Following source section](ending-voice-calls.md)
<a id="source-key-audio-processing-points"></a>

### Key Audio Processing Points

1. **Direct Manipulation**: You may edit the `data` argument in `Client::UserAudioReceivedCallback` in place to change incoming samples
2. **External Processing**: Set `outShouldMuteData = true` when Discord should not play the audio itself, letting your own audio pipeline handle playback
3. **No Encoding Required**: Voice encode and decode work is handled by the SDK; your callback receives raw audio samples

