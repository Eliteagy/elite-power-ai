# Delete stage instance
Context: Discord developer reference: Delete stage instance
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](stage-instance-object.md) / [Previous source section](modify-stage-instance.md)
<a id="source-delete-stage-instance"></a>

### Delete Stage Instance

 DELETE/stage-instances/[{channel.id}](https://docs.discord.com/developers/resources/channel#channel-object) Removes the Stage instance. Returns `204 No Content`. The Gateway event [Stage Instance Delete](https://docs.discord.com/developers/events/gateway-events#stage-instance-delete) is emitted. Requires moderator status in the Stage channel. This endpoint accepts the `X-Audit-Log-Reason` header.
