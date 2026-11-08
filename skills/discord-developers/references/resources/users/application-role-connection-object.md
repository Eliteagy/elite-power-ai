# Application role connection object
Context: Discord developer reference: Application role connection object
[Source](../users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](usernames-and-nicknames.md) / [Previous source section](usernames-and-nicknames-connection-object.md) / [Following source section](get-current-user.md)
<a id="source-application-role-connection-object"></a> <a id="source-application-role-connection-structure"></a>

### Application Role Connection Object

 The role connection object attached to a user by an application.

###### Application Role Connection Structure

| Field | Type | Description |
| --- | --- | --- |
| platform_name | ?string | the vanity name for the platform a bot connected (max 50 characters) |
| metadata | object | object that maps application role connection metadata keys to the user's `string`-ified value (max 100 characters) on the platform a bot connected |

