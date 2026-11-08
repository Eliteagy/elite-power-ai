# Editing deleting threads
Context: Discord developer reference: Editing deleting threads
[Source](threads-index.md) / [Previous source section](syncing-for-other-users.md) / [Following source section](age-restricted-threads.md)
<a id="source-editing--deleting-threads"></a>

### Editing & Deleting Threads

 Threads use the existing channel edit and delete endpoints with `PATCH` and `DELETE`.
- Deleting a thread requires `MANAGE_THREADS`.
- Editing a thread to set `archived` to `false` only requires that the current user is already in the thread. If `locked` is true, the user must have created the thread or have `MANAGE_THREADS`.
- Editing `name`, `archived`, or `auto_archive_duration` requires `MANAGE_THREADS` or current-user ownership of the thread.
- Editing `rate_limit_per_user` or `locked` requires `MANAGE_THREADS`.

