# Voice channel status update
Context: Discord developer reference: Voice channel status update
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](channels-channel-create.md) / [Previous source section](channel-info-channel-structure.md) / [Following source section](voice-channel-start-time-update.md)
<a id="source-voice-channel-status-update"></a>

#### Voice Channel Status Update

 Emitted after the voice channel status changes.
| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | The channel id |
| guild_id | snowflake | The guild id |
| status | ?string | The new voice channel status |

