# Caveats
Context: Discord developer reference: Caveats
[Source](intents-members-and-sharding-index.md) / [Previous source section](list-of-intents.md) / [Following source section](privileged-intents.md)
<a id="source-caveats"></a>

### Caveats

 [Guild Member Update](https://docs.discord.com/developers/events/gateway-events#guild-member-update) is delivered for updates to the current user even if `GUILD_MEMBERS` is not set. [Guild Create](https://docs.discord.com/developers/events/gateway-events#guild-create) and [Request Guild Members](https://docs.discord.com/developers/events/gateway-events#request-guild-members) have special intent behavior; read those sections for details. [Thread Members Update](https://docs.discord.com/developers/events/gateway-events#thread-members-update) only includes current-user thread adds and removals by default. To get updates for other users, request the `GUILD_MEMBERS` [Gateway Intent](https://docs.discord.com/developers/events/gateway#gateway-intents).

