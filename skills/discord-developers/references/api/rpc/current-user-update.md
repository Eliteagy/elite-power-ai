# Current user update
Context: Discord developer reference: Current user update
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-activity-invite.md) / [Following source section](commands-and-events-relationship-update.md)
<a id="source-current_user_update"></a> <a id="source-current-user-update-dispatch-data-structure"></a> <a id="source-example-current-user-update-dispatch-payload"></a>

#### CURRENT_USER_UPDATE

 Takes no arguments. Dispatches the current user's profile each time it changes, such as avatar or username updates.

###### Current User Update Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| id | string | user’s id |
| username | string | user’s username |
| discriminator | string | user’s discriminator |
| global_name | string | user’s display name |
| avatar | string | user’s avatar hash |
| avatar_decoration_data | object | avatar decoration data, or `null` when absent |
| bot | boolean | whether this user account is a bot |
| flags | integer | public flags attached to the user's account |
| premium_type | integer | Nitro subscription type. Requires `identify.premium` scope. |

###### Example Current User Update Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "id": "53908232506183680",
    "username": "Mason",
    "discriminator": "0",
    "global_name": "Mason",
    "avatar": "a_bab14f271d565501444b2ca3be944b25",
    "avatar_decoration_data": null,
    "bot": false,
    "flags": 64,
    "premium_type": 0
  },
  "evt": "CURRENT_USER_UPDATE"
}

```

