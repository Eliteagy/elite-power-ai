# Message reference content attribution
Context: Discord developer reference: Message reference content attribution
[Source](message-objects-and-embeds-index.md) / [Owning endpoint, event, object or procedure conditions](message-reference-structure.md) / [Previous source section](message-reference-types.md) / [Following source section](message-reference-object-voice-messages.md)
<a id="source-message-reference-content-attribution"></a> <a id="source-crosspost-messages"></a> <a id="source-channel-follow-add-messages"></a> <a id="source-pin-messages"></a> <a id="source-forwards"></a> <a id="source-replies"></a> <a id="source-thread-created-messages"></a> <a id="source-thread-starter-messages"></a> <a id="source-poll-result-messages"></a> <a id="source-context-menu-command-messages"></a>

#### Message Reference Content Attribution

 Message references provide general attribution on a message. Several message types include a `message_reference` object.

###### Crosspost messages

- Crosspost messages started in another channel and carry the IS_CROSSPOST flag.
- These messages include all three fields, each pointing back to the original crossposted message.

###### Channel Follow Add messages

- Channel Follow Add messages are automatic messages created when a followed channel posts into the current channel (type 12).
- These messages include `channel_id` and `guild_id`, pointing to the followed announcement channel.

###### Pin messages

- Pin messages are automatic messages created when a message is pinned (type 6).
- These messages include `message_id` and `channel_id`, plus `guild_id` when the pin is in a guild, pointing to the pinned message.

###### Forwards

- Forwards capture a snapshot of another message.
- These messages include an array of [`message_snapshot`](https://docs.discord.com/developers/resources/message#message-snapshot-object) objects containing a copy of the original message. The copy follows the message structure but returns only the minimal fields needed for context and rendering.
  - Notably, `author` is not included

- Detect a forwarded message by checking its `message_reference.type` field
  - `message_snapshots` contains the message data for the forward. Currently only 1 snapshot is supported.
  - prevents spoofing forwarded data
  - `message_snapshots` are captured when the forward is created and are **immutable**; later edits to the original message are not copied over.

- Create a forward by sending a message with a message_reference whose type is `FORWARD`.
  - Required fields: `type`, `message_id`, `channel_id`
  - the requester must have `VIEW_CHANNEL` permissions

###### Replies

- Replies are messages responding to an earlier message (type 19).
- These messages include `message_id` and `channel_id`, plus `guild_id` when the reply is in a guild, pointing to the replied-to message. The channel_id and guild_id match the reply.
- Create replies by including a message_reference when sending a message. When sending, only `message_id` is required.
- The referenced message may be resolved into the `referenced_message` field.

###### Thread Created messages

- Thread Created messages are automatic messages created when a public thread is made from an older message or without a message (type 18).
- These messages include `channel_id` and `guild_id`, pointing to the created thread channel.

###### Thread starter messages

- Thread starter messages are the first messages in public threads created from messages. They point to the parent-channel message that started the thread. (type 21)
- These messages include `message_id`, `channel_id`, and `guild_id`.
- The referenced message may be resolved into the `referenced_message` field.
- These messages never include content, embeds, or attachments; they mainly contain `message_reference` and `referenced_message`.

###### Poll result messages

- Poll result messages are automatic messages sent after a poll ends and the results are finalized. (type 46)
- These messages include `message_id` and `channel_id`, pointing to the original poll message. The `channel_id` matches the poll's channel.
- The author matches the poll author and is mentioned.
- These messages include a [`poll_result` embed](https://docs.discord.com/developers/resources/message#embed-fields-by-embed-type-poll-result-embed-fields)

###### Context Menu Command messages

- Context Menu Command messages are sent when a user runs a context menu Application Command. (type 23)
- If the command was a [message command](https://docs.discord.com/developers/interactions/application-commands#message-commands), the message includes `message_id` and `channel_id`, plus `guild_id` when it is in a guild, pointing to the message used by the command. The channel_id and guild_id match the new message.
- The referenced message may be resolved into the `referenced_message` field.

