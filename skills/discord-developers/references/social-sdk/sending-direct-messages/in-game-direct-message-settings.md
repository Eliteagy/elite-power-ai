# In game direct message settings
Context: Discord developer reference: In game direct message settings
[Source](sending-direct-messages-index.md) / [Previous source section](retrieving-messages-from-a-specific-conversation.md) / [Following source section](development-rate-limits.md)
<a id="source-in-game-direct-message-settings"></a>

### In-Game Direct Message Settings

 The Discord client includes settings that let users control who can DM them in-game through the Social SDK. (Figure: Discord content and social - Connected game settings) The Social SDK cannot change those settings directly. It can call [`Client::OpenConnectedGamesSettingsInDiscord`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a24f268f5eebe9919a3f774354eb577e0), which opens Connected Games settings in the Discord client for game-related DM controls. If the client is disconnected or the user is a provisional account, the call has no effect. On console platforms, it is always a no-op.

---

