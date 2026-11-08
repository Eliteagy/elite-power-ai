# Join thread
Context: Discord developer reference: Join thread
[Source](invites-permissions-and-threads-index.md) / [Previous source section](start-thread-in-forum-or-media-channel.md) / [Following source section](add-thread-member.md)
<a id="source-join-thread"></a>

### Join Thread

  Add the current user to a thread. The thread must not be archived. Success returns an empty 204 response and fires [Thread Members Update](https://docs.discord.com/developers/events/gateway-events#thread-members-update) plus [Thread Create](https://docs.discord.com/developers/events/gateway-events#thread-create) Gateway events.

