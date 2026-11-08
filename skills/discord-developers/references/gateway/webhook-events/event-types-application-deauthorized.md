# Event types application deauthorized
Context: Discord developer reference: Event types application deauthorized
[Source](webhook-events-index.md) / [Owning endpoint, event, object or procedure conditions](event-types.md) / [Previous source section](event-types-application-authorized.md) / [Following source section](event-types-entitlement-create.md)
<a id="source-application-deauthorized"></a> <a id="source-application-deauthorized-structure"></a> <a id="source-application-deauthorized-example"></a> <a id="source-discord-social-sdk"></a>

#### Application Deauthorized

 `APPLICATION_DEAUTHORIZED` fires when a user deauthorizes the app.

###### Application Deauthorized Structure

| Field | Type | Description |
| --- | --- | --- |
| user | user object | User who deauthorized the app |

###### Application Deauthorized Example

```
{
  "version": 1,
  "application_id": "1234560123453231555",
  "type": 1,
  "event": {
    "type": "APPLICATION_DEAUTHORIZED",
    "timestamp": "2024-10-18T14:42:53.064834",
    "data": {
      "user": {
        // user data
      }
    }
  }
}

```

###### Discord Social SDK

 For [Discord Social SDK](https://docs.discord.com/developers/discord-social-sdk) apps, `APPLICATION_DEAUTHORIZED` is the required webhook for learning outside the game that a user's linked-account state changed. Listen for it so application state stays synchronized; if the webhook is missed, the [next token use will fail](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#when-refresh-fails) and the game should return to the [provisional account flow](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#implementing-provisional-accounts). Each revocation that emits this event is mechanically an [unmerge](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#unmerging-provisional-accounts): the merged Discord account becomes a new provisional account, and the Discord user's OAuth2 tokens are invalidated. Triggers include:
- Token revocations through [`/oauth2/token/revoke`](https://docs.discord.com/developers/topics/oauth2#authorization-code-grant) or `Client::RevokeToken`.
- The user removing the app from *User Settings -> Authorized Apps* in Discord.
- The [Social SDK unmerge endpoints](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#unmerging-provisional-accounts).
- The user's Discord [account being banned](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#ban-driven-unmerge).

