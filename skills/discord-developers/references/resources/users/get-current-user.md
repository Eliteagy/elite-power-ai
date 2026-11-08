# Get current user
Context: Discord developer reference: Get current user
[Source](../users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](usernames-and-nicknames.md) / [Previous source section](application-role-connection-object.md) / [Following source section](usernames-and-nicknames-get-user.md)
<a id="source-get-current-user"></a>

### Get Current User

  Returns the requester account's [user](https://docs.discord.com/developers/resources/user#user-object) object. With OAuth2, the `identify` scope is required and returns the object *without* an email; the optional `email` scope returns the object *with* an email when the user has one.

