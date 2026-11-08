# Saving a channel link selection
Context: Discord developer reference: Saving a channel link selection
[Source](linked-channels-index.md) / [Previous source section](fetch-available-servers-guilds-and-channels.md) / [Following source section](try-it-out.md)
<a id="source-saving-a-channel-link-selection"></a>

### Saving a channel link selection

 After the user picks a channel, call [`Client::LinkChannelToLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a3114d58d50d4d2cb5752d95e121315d4) to create or update the lobby link. Use [`Client::UnlinkChannelFromLobby`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a28f78a6fe46eb11eb54ee9b53fa94ffe) to clear it. The lobby, channel, and user must satisfy [Linked Channel Requirements](https://docs.discord.com/developers/discord-social-sdk/development-guides/linked-channels#channel-requirements).

