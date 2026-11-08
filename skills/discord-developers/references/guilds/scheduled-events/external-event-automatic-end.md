# An external event will automatically end at its scheduled end time
Context: Discord developer reference: An external event will automatically end at its scheduled end time
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-scheduled-event-object.md) / [Previous source section](external-event-automatic-start.md) / [Following source section](unstarted-event-cancellation.md)
<a id="source-an-external-event-will-automatically-end-at-its-scheduled-end-time"></a>

### An external event will automatically end at its scheduled end time

 When an event with `'entity_type': EXTERNAL` reaches its `scheduled_end_time`, Discord automatically sets `status` to `COMPLETED`.

