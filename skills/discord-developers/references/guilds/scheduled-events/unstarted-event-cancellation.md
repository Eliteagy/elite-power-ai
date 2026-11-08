# Unstarted event cancellation
Context: Discord developer reference: Unstarted event cancellation
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-scheduled-event-object.md) / [Previous source section](external-event-automatic-end.md) / [Following source section](guild-scheduled-event-permissions-requirements.md)
<a id="source-any-scheduled-event-which-has-not-begun-after-its-scheduled-start-time-will-be-automatically-cancelled-after-a-few-hours"></a>

### Any scheduled event which has not begun after its scheduled start time will be automatically cancelled after a few hours

 An event whose `'status': SCHEDULED` remains past `scheduled_start_time` by a period on the order of hours has its `status` automatically changed to `CANCELLED`.

