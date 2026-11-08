# Delete close channel
Context: Discord developer reference: Delete close channel
[Source](channel-objects-and-settings-index.md) / [Previous source section](set-voice-channel-status.md) / [Following source section](edit-channel-permissions.md)
<a id="source-deleteclose-channel"></a>

### Delete/Close Channel

  Remove a channel, or close a private message conversation. Guild channels require `MANAGE_CHANNELS`; threads require `MANAGE_THREADS`. When a category is removed, its child channels stay in place, lose their `parent_id`, and each emits a [Channel Update](https://docs.discord.com/developers/events/gateway-events#channel-update) Gateway event. A successful call returns a [channel](https://docs.discord.com/developers/resources/channel#channel-object) object and emits [Channel Delete](https://docs.discord.com/developers/events/gateway-events#channel-delete), or [Thread Delete](https://docs.discord.com/developers/events/gateway-events#thread-delete) for a thread target. Guild channel removal is irreversible, so use it carefully. Private messages can be restored by opening the conversation with the recipient again. The Rules or Guidelines channel and Community Updates channel in Community guilds are protected from deletion. This endpoint supports the `X-Audit-Log-Reason` header.

