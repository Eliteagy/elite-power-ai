# Voice chat moderation
Context: Discord developer reference: Voice chat moderation
[Source](integrate-moderation-index.md) / [Previous source section](discord-server-bans.md) / [Following source section](sending-direct-messages.md)
<a id="source-voice-chat-moderation"></a>

### Voice Chat Moderation

 Discord Social SDK exposes audio streams for in-game voice calls, enabling voice-chat moderation. Call data is available through [`Client::StartCallWithAudioCallbacks`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#abcaa891769f9e912bfa0e06ff7221b05) and can be forwarded to your audio moderation system.

```
// Example: Capturing local voice chat audio for asynchronous moderation.

// Callback for local users' audio with moderation
auto capturedCallback = [](int16_t const* data,
                     uint64_t samplesPerChannel, int32_t sampleRate,
                     uint64_t channels) {
    // Call the moderation function
    moderateCapturedVoice(data, samplesPerChannel);
};

// Start the call with our moderation callback
auto call = client->StartCallWithAudioCallbacks(lobbyId, receivedCallback, capturedCallback);

```

---

