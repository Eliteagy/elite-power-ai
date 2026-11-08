# Delete channel permission
Context: Discord developer reference: Delete channel permission
[Source](invites-permissions-and-threads-index.md) / [Previous source section](create-channel-invite.md) / [Following source section](follow-announcement-channel.md)
<a id="source-delete-channel-permission"></a>

### Delete Channel Permission

  Delete a permission overwrite for a channel user or role. This applies only to guild channels and requires `MANAGE_ROLES`. Success returns an empty 204 response and fires a [Channel Update](https://docs.discord.com/developers/events/gateway-events#channel-update) Gateway event. See [permissions](https://docs.discord.com/developers/topics/permissions#permissions) for additional permission behavior. `X-Audit-Log-Reason` is supported.

