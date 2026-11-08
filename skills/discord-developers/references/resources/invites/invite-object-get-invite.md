# Invite object get invite
Context: Discord developer reference: Invite object get invite
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](invite-object.md) / [Previous source section](invite-stage-instance-object.md) / [Following source section](invite-object-delete-invite.md)
<a id="source-get-invite"></a> <a id="source-query-string-params"></a>

### Get Invite

 GET/invites/[{invite.code}](https://docs.discord.com/developers/resources/invite#invite-object) Returns the [invite](https://docs.discord.com/developers/resources/invite#invite-object) object for that code.

###### Query String Params

| Field | Type | Description |
| --- | --- | --- |
| with_counts? | boolean | whether approximate member counts should be included on the invite |
| guild_scheduled_event_id? | snowflake | guild scheduled event to include on the invite |

