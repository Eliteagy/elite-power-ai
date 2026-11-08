# Channels thread delete
Context: Discord developer reference: Channels thread delete
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](channels-channel-create.md) / [Previous source section](channels-thread-update.md) / [Following source section](thread-list-sync.md)
<a id="source-thread-delete"></a>

#### Thread Delete

 Dispatched when a thread visible to the current user is deleted. The payload body contains only the `id`, `guild_id`, `parent_id`, and `type` fields from the [channel](https://docs.discord.com/developers/resources/channel#channel-object) object.

