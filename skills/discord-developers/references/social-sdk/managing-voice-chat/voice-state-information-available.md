# Voice state information available
Context: Discord developer reference: Voice state information available
[Source](managing-voice-chat-index.md) / [Previous source section](checking-individual-participant-status.md) / [Following source section](diagnosing-audio-issues.md)
<a id="source-voice-state-information-available"></a>

### Voice State Information Available

 [`VoiceStateHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1VoiceStateHandle.html#aad2d4454b6677d82721128b0cd98a2d8) exposes these important participant details:
- [`VoiceStateHandle::SelfMute`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1VoiceStateHandle.html#a5476a6e8d5e9092a153b4646371a9f3f): Returns `true` when the participant muted their own microphone, so others cannot hear them
- [`VoiceStateHandle::SelfDeaf`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1VoiceStateHandle.html#a9fd4ac5fb813b926d1336fc65b440f42): Returns `true` when the participant deafened themselves, preventing them from hearing others and preventing others from hearing them
 These values are useful for:
- Showing voice status indicators in the UI
- Building voice features or investigating audio problems

---

