# Token storage
Context: Discord developer reference: Token storage
[Source](configuring-app-metadata-for-linked-roles-index.md) / [Previous source section](acquiring-the-role.md) / [Following source section](advanced-examples.md)
<a id="source-tips--tricks"></a> <a id="source-token-storage"></a>

### Tips & Tricks

### Token storage

 This app depends mainly on Discord's [OAuth2](https://docs.discord.com/developers/topics/oauth2) support for access tokens. User-based authentication in this pattern stores refresh tokens and uses them to request access tokens. The sample's [`src/storage.js`](https://github.com/discord/linked-roles-sample/blob/main/src/storage.js) keeps tokens in memory, but production systems should store them persistently in a database.

