# How it works
Context: Discord developer reference: How it works
[Source](managing-voice-chat-index.md) / [Previous source section](creating-joining-a-lobby-and-starting-joining-a-call.md) / [Following source section](controlling-voice-features.md)
<a id="source-how-it-works"></a>

### How It Works

 [`Client::CreateOrJoinLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8b4e195555ecaa89ccdfc0acd28d3512) and [`Client::StartCall`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aef4f25d761fe198fbe9bc721fc24d83f) both cover the create and join cases without separate caller logic:
- [`Client::CreateOrJoinLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8b4e195555ecaa89ccdfc0acd28d3512): When the supplied secret matches an existing lobby, the caller joins it; otherwise, the SDK creates a lobby using that secret.
- [`Client::StartCall`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aef4f25d761fe198fbe9bc721fc24d83f): When the lobby already has an active voice call, the caller enters it; otherwise, a new call is opened.
 Your code does not need a preflight test for lobby existence or call activity. The SDK resolves both cases, which keeps the implementation shorter and less error-prone.

