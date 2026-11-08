# Follow announcement channel
Context: Discord developer reference: Follow announcement channel
[Source](invites-permissions-and-threads-index.md) / [Previous source section](delete-channel-permission.md) / [Following source section](trigger-typing-indicator.md)
<a id="source-follow-announcement-channel"></a> <a id="source-json-params"></a>

### Follow Announcement Channel

  Follow an Announcement Channel so its messages are sent into a target channel. The target channel requires `MANAGE_WEBHOOKS`. The response is a [followed channel](https://docs.discord.com/developers/resources/channel#followed-channel-object) object, and Discord fires a [Webhooks Update](https://docs.discord.com/developers/events/gateway-events#webhooks-update) Gateway event for that target channel. `X-Audit-Log-Reason` is supported.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| webhook_channel_id | snowflake | id of target channel |

