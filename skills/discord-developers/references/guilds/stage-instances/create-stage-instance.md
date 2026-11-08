# Create stage instance
Context: Discord developer reference: Create stage instance
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](stage-instance-object.md) / [Previous source section](stage-instance-object-auto-closing.md) / [Following source section](get-stage-instance.md)
<a id="source-create-stage-instance"></a> <a id="source-json-params-3"></a>

### Create Stage Instance

 POST/stage-instances Creates a Stage instance tied to a Stage channel. Returns the created [Stage instance](https://docs.discord.com/developers/resources/stage-instance#stage-instance-object-stage-instance-structure). The Gateway event [Stage Instance Create](https://docs.discord.com/developers/events/gateway-events#stage-instance-create) is emitted. Requires a moderator user for the Stage channel. This endpoint accepts the `X-Audit-Log-Reason` header.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| channel_id | snowflake | id of the Stage channel |
| topic | string | topic for the Stage instance (1-120 characters) |
| privacy_level? | integer | privacy level for the Stage instance (default GUILD_ONLY) |
| send_start_notification? * | boolean | whether to notify @everyone when a Stage instance starts |
| guild_scheduled_event_id? | snowflake | guild scheduled event tied to this Stage instance |

 * The stage moderator needs `MENTION_EVERYONE` for Discord to send this notification.

