# Get guild scheduled event users
Context: Discord developer reference: Get guild scheduled event users
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-scheduled-event-object.md) / [Previous source section](delete-guild-scheduled-event.md) / [Following source section](guild-scheduled-event-status-update-automation.md)
<a id="source-get-guild-scheduled-event-users"></a> <a id="source-query-string-params-2"></a>

### Get Guild Scheduled Event Users

  Gets users subscribed to a guild scheduled event and returns [guild scheduled event user](https://docs.discord.com/developers/resources/guild-scheduled-event#guild-scheduled-event-user-object) objects. Guild member data is included when it exists and the `with_member` query parameter is set.

###### Query String Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| limit? | number | number of users to return, up to maximum 100 | 100 |
| with_member? | boolean | whether to include guild member data when available | false |
| before? * | snowflake | limit results to users before the provided user id | null |
| after? * | snowflake | limit results to users after the provided user id | null |

 * Use a user id in `before` or `after` for pagination. Users are always returned in ascending `user_id` order. If both `before` and `after` are supplied, only `before` is used. Fetching users between `before` and `after` is not supported.

