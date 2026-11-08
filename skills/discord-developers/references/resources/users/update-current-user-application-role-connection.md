# Update current user application role connection
Context: Discord developer reference: Update current user application role connection
[Source](../users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](usernames-and-nicknames.md) / [Previous source section](get-current-user-application-role-connection.md) / [Following source section](delete-current-user-application-role-connection.md)
<a id="source-update-current-user-application-role-connection"></a> <a id="source-json-params-3"></a>

### Update Current User Application Role Connection

  Updates the user's [application role connection](https://docs.discord.com/developers/resources/user#application-role-connection-object) for the application named in the path, then returns it. Requires an OAuth2 access token with the `role_connections.write` scope.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| platform_name? | string | the vanity name for the platform a bot connected (max 50 characters) |
| platform_username? | string | the username on the platform a bot connected (max 100 characters) |
| metadata? | object | object that maps application role connection metadata keys to the user's `string`-ified value (max 100 characters) on the platform a bot connected |

