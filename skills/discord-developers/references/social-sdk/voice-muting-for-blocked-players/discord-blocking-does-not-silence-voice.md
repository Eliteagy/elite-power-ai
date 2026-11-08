# Discord blocking does not silence voice
Context: Discord developer reference: Discord blocking does not silence voice
[Source](voice-muting-for-blocked-players-index.md) / [Previous source section](prerequisites.md) / [Following source section](block-signals-may-come-from-outside-discord.md)
<a id="source-why-voice-muting-must-be-handled-explicitly"></a> <a id="source-discord-blocking-does-not-silence-voice"></a>

### Why Voice Muting Must Be Handled Explicitly

### Discord Blocking Does Not Silence Voice

 Calling [`Client::BlockUser`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#add4a917c8382e411d5a55737c9edc8ad) stops friend requests and messages from that user, but lobby voice remains audible. To silence a blocked participant, the game must explicitly invoke [`Call::SetLocalMute`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Call.html#aaf8e7728b15da5d1be8d8b4258225171).

