# Modify stage instance
Context: Discord developer reference: Modify stage instance
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](stage-instance-object.md) / [Previous source section](get-stage-instance.md) / [Following source section](delete-stage-instance.md)
<a id="source-modify-stage-instance"></a> <a id="source-json-params-4"></a>

### Modify Stage Instance

 PATCH/stage-instances/[{channel.id}](https://docs.discord.com/developers/resources/channel#channel-object) Changes fields on an existing Stage instance. Returns the changed [Stage instance](https://docs.discord.com/developers/resources/stage-instance#stage-instance-object-stage-instance-structure). The Gateway event [Stage Instance Update](https://docs.discord.com/developers/events/gateway-events#stage-instance-update) is emitted. Requires moderator status in the Stage channel. This endpoint accepts the `X-Audit-Log-Reason` header.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| privacy_level? | integer | privacy level for the Stage instance |

