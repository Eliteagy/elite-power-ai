# Voice event idle completion
Context: Discord developer reference: Voice event idle completion
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-scheduled-event-object.md) / [Previous source section](stage-event-idle-completion.md) / [Following source section](external-event-automatic-start.md)
<a id="source-an-active-scheduled-event-for-a-voice-channel-where-all-users-have-left-the-voice-channel-will-automatically-end-a-few-minutes-after-the-last-user-leaves-the-channel"></a>

### An active scheduled event for a voice channel where all users have left the voice channel will automatically end a few minutes after the last user leaves the channel

 When an event has `'status': ACTIVE` and `'entity_type': VOICE`, and no users remain connected to the voice channel for a period on the order of minutes, Discord automatically changes event `status` to `COMPLETED`.

