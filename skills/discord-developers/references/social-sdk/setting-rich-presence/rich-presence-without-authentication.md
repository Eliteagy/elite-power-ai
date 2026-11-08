# Rich presence without authentication
Context: Discord developer reference: Rich presence without authentication
[Source](setting-rich-presence-index.md) / [Previous source section](setting-supported-platforms.md) / [Following source section](requirements.md)
<a id="source-rich-presence-without-authentication"></a>

### Rich Presence Without Authentication

 RPC (Remote Procedure Call) Rich Presence works only when the Discord desktop client is running; it does not work with mobile, console, or web clients. Unlike many Discord Social SDK features, **Rich Presence can be set without authentication**. Instead of authenticating through [`Client::Connect`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a873a844c7c4c72e9e693419bb3e290aa), communicate directly with the running desktop client over RPC.

