# Losing access to channels
Context: Discord developer reference: Losing access to channels
[Source](threads-index.md) / [Owning endpoint, event, object or procedure conditions](gaining-access-to-channels.md) / [Following source section](unarchiving-a-thread.md)
<a id="source-losing-access-to-channels"></a>

#### Losing Access to Channels

 When an app loses channel access, the Gateway does **not** send [Thread Delete](https://docs.discord.com/developers/events/gateway-events#thread-delete) or an equivalent thread event. Instead, the app receives the permission-changing event. Tracking lost thread access is possible but difficult because every permission-change path must be handled correctly. Common causes are [Guild Role Update](https://docs.discord.com/developers/events/gateway-events#guild-role-update), [Guild Member Update](https://docs.discord.com/developers/events/gateway-events#guild-member-update), and [Channel Update](https://docs.discord.com/developers/events/gateway-events#channel-update). Discord clients check permissions *before* acting so stale data does not cause invalid actions. If a user or app loses channel access, it is not removed from the thread and remains reported as a thread member, but it receives no new Gateway events unless removed from the thread, which sends [Thread Members Update](https://docs.discord.com/developers/events/gateway-events#thread-members-update).

