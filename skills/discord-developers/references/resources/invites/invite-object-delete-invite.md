# Invite object delete invite
Context: Discord developer reference: Invite object delete invite
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](invite-object.md) / [Previous source section](invite-object-get-invite.md) / [Following source section](get-target-users.md)
<a id="source-delete-invite"></a>

### Delete Invite

 DELETE/invites/[{invite.code}](https://docs.discord.com/developers/resources/invite#invite-object) Deletes an invite. Requires `MANAGE_CHANNELS` on the invite's channel, or `MANAGE_GUILD` to delete any invite in the guild. On success, returns an [invite](https://docs.discord.com/developers/resources/invite#invite-object) object. Discord emits the [Invite Delete](https://docs.discord.com/developers/events/gateway-events#invite-delete) Gateway event. The endpoint accepts `X-Audit-Log-Reason`.

