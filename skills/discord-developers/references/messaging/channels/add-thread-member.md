# Add thread member
Context: Discord developer reference: Add thread member
[Source](invites-permissions-and-threads-index.md) / [Previous source section](join-thread.md) / [Following source section](leave-thread.md)
<a id="source-add-thread-member"></a>

### Add Thread Member

  Add another member to a thread. The caller must be able to send messages there, and the thread must not be archived. Success, including the case where the member already belongs to the thread, returns an empty 204 response and fires a [Thread Members Update](https://docs.discord.com/developers/events/gateway-events#thread-members-update) Gateway event.

