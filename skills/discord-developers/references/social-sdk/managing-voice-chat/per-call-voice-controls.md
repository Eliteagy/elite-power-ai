# Per call voice controls
Context: Discord developer reference: Per call voice controls
[Source](managing-voice-chat-index.md) / [Previous source section](global-voice-controls.md) / [Following source section](voice-activity-detection.md)
<a id="source-per-call-voice-controls"></a>

### Per-Call Voice Controls

 These methods adjust voice behavior for one call through the [`Call`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Call.html#a1cc8a7f73c15a960bc409d734b5edbd1) object:
- [`Call::SetSelfMute`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Call.html#afa35a5d6a4564df97452df58bb74f617) - Disables your mic for this call, preventing other participants from hearing you
- [`Call::SetSelfDeaf`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Call.html#a07d67c210f2a4655c6f1d2899c6d32d6) - Silences this call for you and also stops other participants from hearing you
- [`Call::SetParticipantVolume`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Call.html#ad974fadbe89c453e4d8a3f9824e21ceb) - Changes volume for one selected participant

