# Event types
Context: Discord developer reference: Event types
[Source](webhook-events-index.md) / [Previous source section](event-body-object.md) / [Following source section](event-types-application-authorized.md)
<a id="source-event-types"></a>

### Event Types

 The table lists the webhook event types an app can subscribe to. The "Value" column maps to the event body's `type` field value in the [event body object](https://docs.discord.com/developers/events/webhook-events#event-body-object).
| Name | Value | Description |
| --- | --- | --- |
| Application Authorized | `APPLICATION_AUTHORIZED` | Sent after a user authorizes an app for a server or account |
| Application Deauthorized | `APPLICATION_DEAUTHORIZED` | Sent after a user deauthorizes an app |
| Entitlement Create | `ENTITLEMENT_CREATE` | Entitlement was created |
| Entitlement Update | `ENTITLEMENT_UPDATE` | Entitlement was updated |
| Entitlement Delete | `ENTITLEMENT_DELETE` | Entitlement was deleted |
| Quest User Enrollment | `QUEST_USER_ENROLLMENT` | User joined a Quest (currently unavailable) |
| Lobby Message Create | `LOBBY_MESSAGE_CREATE` | Sent when a lobby message is created |
| Lobby Message Update | `LOBBY_MESSAGE_UPDATE` | Sent when a lobby message is updated |
| Lobby Message Delete | `LOBBY_MESSAGE_DELETE` | Sent when a lobby message is deleted |
| Game Direct Message Create | `GAME_DIRECT_MESSAGE_CREATE` | Reports creation of a game DM tied to an active Social SDK session |
| Game Direct Message Update | `GAME_DIRECT_MESSAGE_UPDATE` | Reports edits to a game DM tied to an active Social SDK session |
| Game Direct Message Delete | `GAME_DIRECT_MESSAGE_DELETE` | Reports removal of a game DM tied to an active Social SDK session |

