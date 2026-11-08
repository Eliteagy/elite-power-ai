# Event types application authorized
Context: Discord developer reference: Event types application authorized
[Source](webhook-events-index.md) / [Owning endpoint, event, object or procedure conditions](event-types.md) / [Following source section](event-types-application-deauthorized.md)
<a id="source-application-authorized"></a> <a id="source-application-authorized-structure"></a> <a id="source-application-authorized-example"></a>

#### Application Authorized

 `APPLICATION_AUTHORIZED` fires when the app is added to a server or to a user account.

###### Application Authorized Structure

| Field | Type | Description |
| --- | --- | --- |
| integration_type? | integer | Authorization installation context: guild (`0`) when installed to a server, or user (`1`) when installed to a user's account |
| user | user object | User who authorized the app |
| scopes | array of strings | Scopes authorized by the user |
| guild? | guild object | Server the app was authorized for, present when integration type is `0` |

###### Application Authorized Example

```
{
  "version": 1,
  "application_id": "1234560123453231555",
  "type": 1,
  "event": {
    "type": "APPLICATION_AUTHORIZED",
    "timestamp": "2024-10-18T14:42:53.064834",
    "data": {
      "integration_type": 1,
      "scopes": [
        "applications.commands"
      ],
      "user": {
        // user data
      }
    }
  }
}

```

