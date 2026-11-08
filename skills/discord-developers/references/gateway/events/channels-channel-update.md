# Channels channel update
Context: Discord developer reference: Channels channel update
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](channels-channel-create.md) / [Following source section](channels-channel-delete.md)
<a id="source-channel-update"></a>

#### Channel Update

 Sent when a channel changes. The nested payload is a [channel](https://docs.discord.com/developers/resources/channel#channel-object) object. This event is not sent for changes to `last_message_id`; track last_message_id changes through [Message Create](https://docs.discord.com/developers/events/gateway-events#message-create) events, or [Thread Create](https://docs.discord.com/developers/events/gateway-events#thread-create) events for `GUILD_FORUM` and `GUILD_MEDIA` channels. The event may mention roles or guild members that no longer exist in the guild.

