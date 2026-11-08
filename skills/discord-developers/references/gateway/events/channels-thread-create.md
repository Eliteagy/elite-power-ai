# Channels thread create
Context: Discord developer reference: Channels thread create
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](channels-channel-create.md) / [Previous source section](voice-channel-start-time-update.md) / [Following source section](channels-thread-update.md)
<a id="source-thread-create"></a>

#### Thread Create

 Dispatched when a thread is created for the current user, becomes relevant to the current user, or gains the current user as a member. The payload body is a [channel](https://docs.discord.com/developers/resources/channel#channel-object) object.
- Newly created threads include an extra `newly_created` boolean field.
- Adding the current user to an existing private thread also includes a [thread member](https://docs.discord.com/developers/resources/channel#thread-member-object) object.

