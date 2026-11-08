# Channel info channel structure
Context: Discord developer reference: Channel info channel structure
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](channels-channel-create.md) / [Owning endpoint, event, object or procedure conditions](channels-channel-info.md) / [Following source section](voice-channel-status-update.md)
<a id="source-gateway-events-part-2"></a> <a id="source-channel-info-channel-structure"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

###### Channel Info Channel Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | The channel id |
| status? | ?string | The voice channel status |
| voice_start_time? | ?integer | Voice session start time as a Unix timestamp (in seconds) |

