# Updated Thread Permissions

Date: 2021-09-16
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3958) · [Year index](INDEX.md)

<a id="source-updated-thread-permissions"></a>


Thread permissions were simplified and updated:
- "Use Public Threads" became "Create Public Threads", allowing users to create public threads and announcement threads in a channel even without permission to send messages there.
- "Use Private Threads" became "Create Private Threads", allowing users to create private threads in a channel even without permission to send messages there.
A new permission was added:
- "Send Messages in Threads" lets users send messages in a thread. "Send Messages" has no effect inside threads: users **must** have "Send Messages in Threads" to send a thread message. This supports configurations where a user can participate in a thread but not send messages in the parent channel, such as a thread on an announcement post.
