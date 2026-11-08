# Edit channel permissions
Context: Discord developer reference: Edit channel permissions
[Source](channel-objects-and-settings-index.md) / [Previous source section](delete-close-channel.md) / [Following source section](edit-channel-permissions-json-params.md)
<a id="source-edit-channel-permissions"></a>

### Edit Channel Permissions

  Edit permission overwrites for a user or role in a channel. This is available only for guild channels and requires `MANAGE_ROLES`. A bot can allow or deny only permissions it has in the guild or parent channel, if applicable, unless it has a `MANAGE_ROLES` overwrite in the channel. Success returns an empty 204 response. Triggers a [Channel Update](https://docs.discord.com/developers/events/gateway-events#channel-update) Gateway event. For permission details, see [permissions](https://docs.discord.com/developers/topics/permissions#permissions). This endpoint supports the `X-Audit-Log-Reason` header.

