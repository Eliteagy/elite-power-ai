# Remove thread member
Context: Discord developer reference: Remove thread member
[Source](invites-permissions-and-threads-index.md) / [Previous source section](leave-thread.md) / [Following source section](get-thread-member.md)
<a id="source-remove-thread-member"></a>

### Remove Thread Member

  Remove another member from a thread. The caller needs `MANAGE_THREADS`, unless they created the `PRIVATE_THREAD`. The thread also must not be archived. Success returns an empty 204 response and fires a [Thread Members Update](https://docs.discord.com/developers/events/gateway-events#thread-members-update) Gateway event.

