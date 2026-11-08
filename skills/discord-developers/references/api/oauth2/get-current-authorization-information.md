# Get current authorization information
Context: Discord developer reference: Get current authorization information
[Source](authorization-information-index.md) / [Previous source section](get-current-bot-application-information.md)
<a id="source-get-current-authorization-information"></a> <a id="source-response-structure"></a> <a id="source-example-authorization-information"></a>

### Get Current Authorization Information

  Provides details for the active authorization. The request must use bearer token authentication.

###### Response Structure

| Field | Type | Description |
| --- | --- | --- |
| application | partial application object | the current application |
| scopes | array of strings | scopes that the user granted to the application |
| expires | ISO8601 timestamp | when the access token expires |
| user? | user object | user that authorized the application, present when authorization included the `identify` scope |

###### Example Authorization Information

```
{
    "application": {
        "id": "159799960412356608",
        "name": "AIRHORN SOLUTIONS",
        "icon": "f03590d3eb764081d154a66340ea7d6d",
        "description": "",
        "hook": true,
        "bot_public": true,
        "bot_require_code_grant": false,
        "verify_key": "c8cde6a3c8c6e49d86af3191287b3ce255872be1fff6dc285bdb420c06a2c3c8"
    },
    "scopes": [
        "guilds.join",
        "identify"
    ],
    "expires": "2021-01-23T02:33:17.017000+00:00",
    "user": {
        "id": "268473310986240001",
        "username": "discord",
        "avatar": "f749bb0cbeeb26ef21eca719337d20f1",
        "discriminator": "0",
        "global_name": "Discord",
        "public_flags": 131072
    }
}

```
