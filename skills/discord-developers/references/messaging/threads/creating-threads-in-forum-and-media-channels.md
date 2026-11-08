# Creating threads in forum and media channels
Context: Discord developer reference: Creating threads in forum and media channels
[Source](threads-index.md) / [Previous source section](media-channels.md) / [Following source section](forum-and-media-channel-fields.md)
<a id="source-creating-threads-in-forum-and-media-channels"></a>

### Creating Threads in Forum and Media Channels

 In thread-only channels, threads appear as posts. Create them with [`POST /channels/<channel_id>/threads`](https://docs.discord.com/developers/resources/channel#start-thread-in-forum-or-media-channel), using [parameters](https://docs.discord.com/developers/resources/channel#start-thread-in-forum-or-media-channel-jsonform-params) that differ slightly from text-channel thread creation. For example, creating a thread in a thread-only channel also creates a message with the same ID as the thread, so the request must include both thread and message parameters. These threads inherit parent-channel permissions like text-channel threads, except creating one in a thread-only channel requires only `SEND_MESSAGES`.

