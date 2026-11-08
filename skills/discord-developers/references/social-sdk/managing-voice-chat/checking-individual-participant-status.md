# Checking individual participant status
Context: Discord developer reference: Checking individual participant status
[Source](managing-voice-chat-index.md) / [Previous source section](checking-if-a-call-is-active.md) / [Following source section](voice-state-information-available.md)
<a id="source-checking-individual-participant-status"></a>

### Checking Individual Participant Status

 Use `VoiceStateHandle` to read voice state for individual participants in a call:

```
// Get voice state information for participants
const auto callInfo = lobby->GetCallInfoHandle();
if (callInfo) {
  const auto participants = callInfo->GetParticipants();

  for (const auto &participantId : participants) {
    const auto voiceState = callInfo->GetVoiceStateHandle(participantId);
    if (voiceState) {
      const bool isMuted = voiceState->SelfMute();
      const bool isDeafened = voiceState->SelfDeaf();

      std::cout << "Participant " << participantId
                << " - Muted: " << (isMuted ? "Yes" : "No")
                << ", Deafened: " << (isDeafened ? "Yes" : "No")
                << std::endl;
    }
  }
}

```

