# Checking if a call is active
Context: Discord developer reference: Checking if a call is active
[Source](managing-voice-chat-index.md) / [Previous source section](checking-lobby-voice-call-status.md) / [Following source section](checking-individual-participant-status.md)
<a id="source-checking-if-a-call-is-active"></a>

### Checking if a Call is Active

 Call `LobbyHandle::GetCallInfoHandle()` to find out whether the lobby currently has an active voice call:

```
// Check if there's an active call in the lobby
const auto callInfoHandle = lobby->GetCallInfoHandle();
if (callInfoHandle) {
  // There's an active call - you can join it or get participant
  // info
  const auto participants = callInfoHandle->GetParticipants();
  std::cout << "Active call with " << participants.size()
            << " participants" << std::endl;
} else {
  // No active call in this lobby
  std::cout << "No active voice call in this lobby" << std::endl;
}

```

