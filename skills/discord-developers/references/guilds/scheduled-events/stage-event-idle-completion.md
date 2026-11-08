# Stage event idle completion
Context: Discord developer reference: Stage event idle completion
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-scheduled-event-object.md) / [Previous source section](guild-scheduled-event-status-update-automation.md) / [Following source section](voice-event-idle-completion.md)
<a id="source-an-active-scheduled-event-for-a-stage-channel-where-all-users-have-left-the-stage-channel-will-automatically-end-a-few-minutes-after-the-last-user-leaves-the-channel"></a>

### An active scheduled event for a stage channel where all users have left the stage channel will automatically end a few minutes after the last user leaves the channel

 When an event has `'status': ACTIVE` and `'entity_type': STAGE_INSTANCE`, and no users remain connected to the stage channel for a period on the order of minutes, Discord automatically changes event `status` to `COMPLETED`.

