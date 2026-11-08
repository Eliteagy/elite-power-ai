# Modify current user
Context: Discord developer reference: Modify current user
[Source](../users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](usernames-and-nicknames.md) / [Previous source section](usernames-and-nicknames-get-user.md) / [Following source section](get-current-user-guilds.md)
<a id="source-modify-current-user"></a> <a id="source-json-params"></a>

### Modify Current User

  Updates the requester's user account settings and returns a [user](https://docs.discord.com/developers/resources/user#user-object) object on success. A successful update fires a [User Update](https://docs.discord.com/developers/events/gateway-events#user-update) Gateway event. Every parameter for this endpoint is optional.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| username | string | user's username; changing it may randomize the user's discriminator. |
| avatar | ?image data | when provided, changes the user's avatar |
| banner | ?image data | when provided, changes the user's banner |

