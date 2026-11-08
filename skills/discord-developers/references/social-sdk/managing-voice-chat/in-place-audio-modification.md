# In place audio modification
Context: Discord developer reference: In place audio modification
[Source](managing-voice-chat-index.md) / [Previous source section](manipulating-voice-data-with-callbacks.md) / [Following source section](external-audio-pipeline-integration.md)
<a id="source-in-place-audio-modification"></a>

### In-Place Audio Modification

 To alter incoming samples directly, such as lowering volume in place:

```
const auto call = client->StartCallWithAudioCallbacks(
    lobbyId,
    [](uint64_t userId, int16_t *data, const size_t samplesPerChannel,
       int sampleRate, const size_t channels,
       bool &outShouldMuteData) {
      // Dampen volume of incoming audio by modifying data's samples
      // in-place
      for (int i = 0; i < samplesPerChannel * channels; i++) {
        data[i] *= 0.5; // Reduce volume by 50%
      }
    },
    [](int16_t *data, uint64_t samplesPerChannel, int32_t sampleRate,
       uint64_t channels) {});

```

