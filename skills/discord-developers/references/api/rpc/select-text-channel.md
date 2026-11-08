# Select text channel
Context: Discord developer reference: Select text channel
[Source](connection-and-command-contracts-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](get-selected-voice-channel.md) / [Following source section](get-voice-settings-response-structure.md)
<a id="source-select_text_channel"></a> <a id="source-select-text-channel-argument-structure"></a>

#### SELECT_TEXT_CHANNEL

 Used for join and leave text channels, group dms, or dms. Responds using the [Get Channel](https://docs.discord.com/developers/topics/rpc#getchannel) response, or `null` once none.

###### Select Text Channel Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| channel_id | string | Channel id to join (or `null` to leave) |
| timeout | integer | asynchronously join channel with time to wait before timing out |

