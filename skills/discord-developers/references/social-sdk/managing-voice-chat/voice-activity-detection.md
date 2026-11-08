# Voice activity detection
Context: Discord developer reference: Voice activity detection
[Source](managing-voice-chat-index.md) / [Previous source section](per-call-voice-controls.md) / [Following source section](detecting-no-audio-input.md)
<a id="source-voice-activity-detection"></a>

### Voice Activity Detection

 Call [`Call::SetVADThreshold`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Call.html#a7c3fd83c5dfe37d796e30c5e28c93b6e) to tune the sensitivity of voice activity detection, controlling when speech is considered active.

```
// Per-call controls (assuming you have a Call object)
uint64_t lobbyId = 123456789;  // Your lobby ID
auto call = client->GetCall(lobbyId);
if (call) {
    call.SetSelfMute(true);           // Mute in this call only
    call.SetSelfDeaf(false);          // Unmute audio in this call
    call.SetParticipantVolume(userId, 150.0f);  // Increase participant volume
    call.SetVADThreshold(false, -30.0f);       // Set custom voice detection threshold
}

// Global controls
client->SetSelfMuteAll(true);          // Mute across all calls
client->SetInputVolume(75.0f);         // Set microphone to 75%
client->SetOutputVolume(120.0f);       // Increase speaker volume to 120%

```

