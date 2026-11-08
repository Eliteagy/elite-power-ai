# Evolving with users main entrypoint
Context: Discord developer reference: Evolving with users main entrypoint
[Source](entrypoint-content-design-index.md) / [Owning endpoint, event, object or procedure conditions](evolving-with-users.md) / [Following source section](evolving-with-users-content-guidelines.md)
<a id="source-main-entrypoint"></a>

### Main entrypoint

 Games must provide an entrypoint that [sends players to the appropriate Discord client settings page](https://docs.discord.com/developers/discord-social-sdk/development-guides/sending-direct-messages#ingame-direct-message-settings). Show it only to players with a connected Discord account. As with authentication, the player is redirected to the Discord client to adjust social settings; if the client is missing, the browser is used instead. (Figure: Main entrypoint)

