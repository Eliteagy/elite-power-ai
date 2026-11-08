# Relationship update relationship types
Context: Discord developer reference: Relationship update relationship types
[Source](relationship-and-entitlement-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events-relationship-update.md) / [Previous source section](relationship-update-dispatch-data-structure.md) / [Following source section](commands-and-events-entitlement-create.md)
<a id="source-relationship-types"></a> <a id="source-presence-object"></a> <a id="source-example-relationship-update-dispatch-payload"></a>

###### Relationship Types

| Type | Value | Description |
| --- | --- | --- |
| NONE | 0 | relationship removed |
| FRIEND | 1 | user is a friend |
| BLOCKED | 2 | user is blocked |
| PENDING_INCOMING | 3 | incoming friend request |
| PENDING_OUTGOING | 4 | outgoing friend request |
| IMPLICIT | 5 | user shares a guild with the current user but is not a friend |

###### Presence Object

| Field | Type | Description |
| --- | --- | --- |
| status | string | user’s status (`online`, `idle`, `dnd`, `offline`) |
| activity | activity object | current activity for this application for the user (`null` when absent) |

###### Example Relationship Update Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "type": 1,
    "user": {
      "id": "190320984123768832",
      "username": "test user 2",
      "discriminator": "0",
      "global_name": "test user 2",
      "avatar": "b004ec1740a63ca06ae2e14c5cee11f3",
      "bot": false,
      "flags": 0,
      "premium_type": 0
    },
    "presence": {
      "status": "online",
      "activity": null
    }
  },
  "evt": "RELATIONSHIP_UPDATE"
}

```

