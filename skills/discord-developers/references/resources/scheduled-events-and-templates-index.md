# Scheduled events, recurrence/status/permissions and guild templates

Open when checking scheduled events, recurrence/status/permissions and guild templates.

<a id="guild-scheduled-event-guild-template"></a> <a id="overview"></a> <a id="guild-scheduled-event-object"></a> - [Open when reading Guild Scheduled Event Object](../guilds/scheduled-events/guild-scheduled-event-object.md).
Overview
<a id="guild-scheduled-event-object-1"></a> <a id="guild-scheduled-event-structure"></a> <a id="guild-scheduled-event-privacy-level"></a> <a id="guild-scheduled-event-entity-types"></a> <a id="field-requirements-by-entity-type"></a> <a id="guild-scheduled-event-status"></a> <a id="valid-guild-scheduled-event-status-transitions"></a> <a id="guild-scheduled-event-entity-metadata"></a> - [Open when reading Guild Scheduled Event Structure](../guilds/scheduled-events/guild-scheduled-event-structure.md).
Guild Scheduled Event Object; Guild Scheduled Event Privacy Level; Guild Scheduled Event Entity Types; Field Requirements By Entity Type; Guild Scheduled Event Status; Valid Guild Scheduled Event Status Transitions; Guild Scheduled Event Entity Metadata
<a id="guild-scheduled-event-user-object"></a> <a id="guild-scheduled-event-user-structure"></a> - [Open when reading Guild Scheduled Event User Structure](../guilds/scheduled-events/guild-scheduled-event-user-structure.md).
Guild Scheduled Event User Object
<a id="guild-scheduled-event-recurrence-rule-object"></a> <a id="guild-scheduled-event-recurrence-rule-structure"></a> <a id="the-following-fields-cannot-be-set-by-the-client--application"></a> <a id="the-following-combinations-are-mutually-exclusive"></a> <a id="by_weekday"></a> <a id="by_n_weekday"></a> <a id="by_month-and-by_month_day"></a> - [Open when reading Guild Scheduled Event Recurrence Rule Object](../guilds/scheduled-events/guild-scheduled-event-recurrence-rule-object.md).
Guild Scheduled Event Recurrence Rule Structure; The following fields cannot be set by the client / application; The following combinations are mutually exclusive; `by_weekday`; `by_n_weekday`; `by_month` and `by_month_day`
<a id="interval-can-only-be-set-to-a-value-other-than-1-when-frequency-is-set-to-weekly-1"></a> <a id="guild-scheduled-event-recurrence-rule---frequency"></a> <a id="guild-scheduled-event-recurrence-rule---weekday"></a> - [Open when reading `interval` can only be set to a value other than `1` when `frequency` is set to `WEEKLY` (`1`)](../guilds/scheduled-events/weekly-recurrence-interval-and-frequency-values.md).
Guild Scheduled Event Recurrence Rule - Frequency; Guild Scheduled Event Recurrence Rule - Weekday
<a id="guild-scheduled-event-recurrence-rule---n_weekday-structure"></a> <a id="guild-scheduled-event-recurrence-rule---month"></a> - [Open when reading Guild Scheduled Event Recurrence Rule - N_Weekday Structure](../guilds/scheduled-events/guild-scheduled-event-recurrence-rule-n-weekday-structure.md).
Guild Scheduled Event Recurrence Rule - Month
<a id="list-scheduled-events-for-guild"></a> <a id="query-string-params"></a> - [Open when reading List Scheduled Events for Guild](../guilds/scheduled-events/list-scheduled-events-for-guild.md).
Query String Params
<a id="create-guild-scheduled-event"></a> <a id="json-params"></a> - [Open when reading Create Guild Scheduled Event](../guilds/scheduled-events/create-guild-scheduled-event.md).
JSON Params
<a id="get-guild-scheduled-event"></a> <a id="query-string-params-1"></a> - [Open when reading Get Guild Scheduled Event](../guilds/scheduled-events/get-guild-scheduled-event.md).
Query String Params
<a id="modify-guild-scheduled-event"></a> <a id="json-params-1"></a> - [Open when reading Modify Guild Scheduled Event](../guilds/scheduled-events/modify-guild-scheduled-event.md).
JSON Params
<a id="delete-guild-scheduled-event"></a> - [Open when reading Delete Guild Scheduled Event](../guilds/scheduled-events/delete-guild-scheduled-event.md).
<a id="get-guild-scheduled-event-users"></a> <a id="query-string-params-2"></a> - [Open when reading Get Guild Scheduled Event Users](../guilds/scheduled-events/get-guild-scheduled-event-users.md).
Query String Params
<a id="guild-scheduled-event-status-update-automation"></a> - [Open when reading Guild Scheduled Event Status Update Automation](../guilds/scheduled-events/guild-scheduled-event-status-update-automation.md).
<a id="an-active-scheduled-event-for-a-stage-channel-where-all-users-have-left-the-stage-channel-will-automatically-end-a-few-minutes-after-the-last-user-leaves-the-channel"></a> - [Open when reading An active scheduled event for a stage channel where all users have left the stage channel will automatically end a few minutes after the last user leaves the channel](../guilds/scheduled-events/stage-event-idle-completion.md).
<a id="an-active-scheduled-event-for-a-voice-channel-where-all-users-have-left-the-voice-channel-will-automatically-end-a-few-minutes-after-the-last-user-leaves-the-channel"></a> - [Open when reading An active scheduled event for a voice channel where all users have left the voice channel will automatically end a few minutes after the last user leaves the channel](../guilds/scheduled-events/voice-event-idle-completion.md).
<a id="an-external-event-will-automatically-begin-at-its-scheduled-start-time"></a> - [Open when reading An external event will automatically begin at its scheduled start time](../guilds/scheduled-events/external-event-automatic-start.md).
<a id="an-external-event-will-automatically-end-at-its-scheduled-end-time"></a> - [Open when reading An external event will automatically end at its scheduled end time](../guilds/scheduled-events/external-event-automatic-end.md).
<a id="any-scheduled-event-which-has-not-begun-after-its-scheduled-start-time-will-be-automatically-cancelled-after-a-few-hours"></a> - [Open when reading Any scheduled event which has not begun after its scheduled start time will be automatically cancelled after a few hours](../guilds/scheduled-events/unstarted-event-cancellation.md).
<a id="guild-scheduled-event-permissions-requirements"></a> - [Open when reading Guild Scheduled Event Permissions Requirements](../guilds/scheduled-events/guild-scheduled-event-permissions-requirements.md).
<a id="permissions-for-events-with-entity_type-stage_instance"></a> - [Open when reading Permissions for events with entity_type: STAGE_INSTANCE](../guilds/scheduled-events/permissions-for-events-with-entity-type-stage-instance.md).
<a id="get-permissions"></a> - [Open when reading Get Permissions](../guilds/scheduled-events/stage-event-get-permissions.md).
<a id="create-permissions"></a> - [Open when reading Create Permissions](../guilds/scheduled-events/stage-event-create-permissions.md).
<a id="modifydelete-permissions"></a> - [Open when reading Modify/Delete Permissions](../guilds/scheduled-events/modify-delete-permissions.md).
<a id="permissions-for-events-with-entity_type-voice"></a> - [Open when reading Permissions for events with entity_type: VOICE](../guilds/scheduled-events/permissions-for-events-with-entity-type-voice.md).
<a id="get-permissions-1"></a> - [Open when reading Get Permissions](../guilds/scheduled-events/permissions-for-events-with-entity-type-voice-get-permissions.md).
<a id="create-permissions-1"></a> - [Open when reading Create permissions](../guilds/scheduled-events/voice-event-create-permissions.md).
<a id="modifydelete-permissions-1"></a> - [Open when reading Modify/Delete Permissions](../guilds/scheduled-events/modify-delete-permissions.md).
<a id="permissions-for-events-with-entity_type-external"></a> - [Open when reading Permissions for events with entity_type: EXTERNAL](../guilds/scheduled-events/permissions-for-events-with-entity-type-external.md).
<a id="get-permissions-2"></a> - [Open when reading Get Permissions](../guilds/scheduled-events/external-event-get-permissions.md).
<a id="create-permissions-2"></a> - [Open when reading Create permissions](../guilds/scheduled-events/external-event-create-permissions.md).
<a id="modifydelete-permissions-2"></a> - [Open when reading Modify/Delete Permissions](../guilds/scheduled-events/modify-delete-permissions.md).
<a id="guild-template-object"></a> <a id="guild-template-object-1"></a> <a id="guild-template-structure"></a> - [Open when reading Guild Template Object](../guilds/templates/guild-template-object.md).
Guild Template Structure
<a id="example-guild-template-object"></a> - [Open when reading Example Guild Template Object](../guilds/templates/example-guild-template-object.md).
<a id="get-guild-template"></a> - [Open when reading Get Guild Template](../guilds/templates/get-guild-template.md).
<a id="get-guild-templates"></a> - [Open when reading Get Guild Templates](../guilds/templates/get-guild-templates.md).
<a id="create-guild-template"></a> <a id="json-params-2"></a> - [Open when reading Create Guild Template](../guilds/templates/create-guild-template.md).
JSON Params
<a id="sync-guild-template"></a> - [Open when reading Sync Guild Template](../guilds/templates/sync-guild-template.md).
<a id="modify-guild-template"></a> <a id="json-params-3"></a> - [Open when reading Modify Guild Template](../guilds/templates/modify-guild-template.md).
JSON Params
<a id="delete-guild-template"></a> - [Open when reading Delete Guild Template](../guilds/templates/delete-guild-template.md).

[Reference Language Selection](../languages.md) - Open when you need a language version of this skill's references other than English.
