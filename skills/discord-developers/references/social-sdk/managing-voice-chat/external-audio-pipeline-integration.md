# External audio pipeline integration
Context: Discord developer reference: External audio pipeline integration
[Source](managing-voice-chat-index.md) / [Previous source section](in-place-audio-modification.md) / [Following source section](key-audio-processing-points.md)
<a id="source-external-audio-pipeline-integration"></a>

### External Audio Pipeline Integration

 To send audio through an external processor such as [FMOD](https://www.fmod.com/) or [Wwise](https://www.audiokinetic.com/en/wwise/overview/):

```
const auto call = client->StartCallWithAudioCallbacks(lobbyId,
    [](uint64_t userId, int16_t* data, size_t samplesPerChannel,
       int sampleRate, size_t channels, bool& outShouldMuteData) {
        // Prevent Discord from playing the audio directly
        outShouldMuteData = true;

        const int totalNumSamples = samplesPerChannel * channels;
        // Send audio data to your external audio system
        SendAudioToExternalAudioSystem(data, totalNumSamples);
    },
    [](int16_t *data, uint64_t samplesPerChannel, int32_t sampleRate,
       uint64_t channels) {});

```

