# Soundboard sound object
Context: Discord developer reference: Soundboard sound object
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Previous source section](../../monetization/skus/sku-object-list-skus.md) / [Following source section](soundboard-sound-structure.md)
<a id="source-soundboard-sound-object"></a>

## Soundboard Sound Object

Playing a soundboard sound in a voice channel emits the Gateway event [Voice Channel Effect Send](https://docs.discord.com/developers/events/gateway-events#voice-channel-effect-send) for connected users. Discord supplies [default sounds](https://docs.discord.com/developers/resources/soundboard#list-default-soundboard-sounds) to everyone. Guild soundboard sounds can be [created in a guild](https://docs.discord.com/developers/resources/soundboard#create-guild-soundboard-sound); guild users can use those sounds there, and Nitro subscribers can use them across all guilds. Use [Request Soundboard Sounds](https://docs.discord.com/developers/events/gateway-events#request-soundboard-sounds) to retrieve soundboard sounds for a set of guilds over the Gateway.

