# Voice channel start time update
Context: Discord developer reference: Voice channel start time update
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](channels-channel-create.md) / [Previous source section](voice-channel-status-update.md) / [Following source section](channels-thread-create.md)
<a id="source-voice-channel-start-time-update"></a>

#### Voice Channel Start Time Update

 Emitted after the voice channel start time changes.
| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | The channel id |
| guild_id | snowflake | The guild id |
| voice_start_time? | ?integer | Voice session start time as a Unix timestamp (in seconds) |

