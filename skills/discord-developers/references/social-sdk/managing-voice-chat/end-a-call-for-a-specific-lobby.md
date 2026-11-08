# End a call for a specific lobby
Context: Discord developer reference: End a call for a specific lobby
[Source](managing-voice-chat-index.md) / [Previous source section](ending-voice-calls.md) / [Following source section](end-all-calls.md)
<a id="source-end-a-call-for-a-specific-lobby"></a>

### End a Call For a Specific Lobby

```
uint64_t lobbyId = 123456789;  // Your lobby ID
client->EndCall(lobbyId, []() {
    std::cout << "🔇 Call ended successfully" << std::endl;
});

```

