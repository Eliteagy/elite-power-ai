# Privileged intents
Context: Discord developer reference: Privileged intents
[Source](intents-members-and-sharding-index.md) / [Previous source section](caveats.md) / [Following source section](enabling-privileged-intents.md)
<a id="source-privileged-intents"></a>

### Privileged Intents

 Some intents have extra access requirements because of the data they expose. Those intents currently include:
- `GUILD_PRESENCES`
- `GUILD_MEMBERS`
- [`MESSAGE_CONTENT`](https://docs.discord.com/developers/events/gateway#message-content-intent)
 Apps that meet verification requirements **must** be approved for the privileged intent(s) before use. After verification, privileged intents can be requested from the app settings in the Developer Portal. Before adding any privileged intent to the `IDENTIFY` payload, enable the exact privileged intents the app needs in the Developer Portal. Only enable a privileged intent when the use case requires it and complies with the Developer Policy. The [You Might Not Need a Privileged Intent](https://docs.discord.com/developers/gateway/you-might-not-need-a-privileged-intent) guide explains what data these intents provide and what alternatives may work.

