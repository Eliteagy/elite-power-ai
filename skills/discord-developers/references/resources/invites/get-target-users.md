# Get target users
Context: Discord developer reference: Get target users
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](invite-object.md) / [Previous source section](invite-object-delete-invite.md) / [Following source section](update-target-users.md)
<a id="source-get-target-users"></a>

### Get Target Users

 GET/invites/[{invite.code}](https://docs.discord.com/developers/resources/invite#invite-object)/target-users Returns users allowed to view and accept the invite. The response is a CSV with header `user_id`; each subsequent line contains a user ID from the file submitted to [invite create](https://docs.discord.com/developers/resources/channel#create-channel-invite). Caller must be the inviter, have `MANAGE_GUILD`, or have `VIEW_AUDIT_LOG`.

