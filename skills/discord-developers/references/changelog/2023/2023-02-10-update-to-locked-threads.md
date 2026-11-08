# Update to Locked Threads

Date: 2023-02-10
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3338) · [Year index](INDEX.md)

<a id="source-update-to-locked-threads"></a> <a id="source-upcoming-changes"></a>


### Upcoming Changes

At the time of this notice, Discord threads, including forum posts, could be archived alone or locked together with archived status. Starting on **March 6, 2023**, threads can be locked *without* being archived, changing the meaning of the [`locked` field](https://docs.discord.com/developers/resources/channel#thread-metadata-object-thread-metadata-structure). Today, `locked` means a user without [`MANAGE_THREADS` (`1 << 34`) permission](https://docs.discord.com/developers/topics/permissions#permissions-bitwise-permission-flags) cannot reopen the thread, but it does not limit activity inside active, non-archived threads. After this change, users and bot users without `MANAGE_THREADS` face more restrictions in locked threads: they cannot create or update messages, or update properties such as title or tags. Some actions, including deleting messages and adding or removing reactions, are allowed in locked threads *only* when the thread is active, meaning un-archived. Users or bot users with `MANAGE_THREADS` can still modify the thread and messages. The change does not affect [`archived` field](https://docs.discord.com/developers/resources/channel#thread-metadata-object-thread-metadata-structure) meaning or behavior for threads that are both locked and archived.

<a id="source-how-do-i-prepare-for-this-change"></a>

### How do I prepare for this change?

Apps that work with threads, including forum posts, should inspect `locked` and/or `archived` to decide which actions are allowed. Be ready to handle errors when a thread is locked.
