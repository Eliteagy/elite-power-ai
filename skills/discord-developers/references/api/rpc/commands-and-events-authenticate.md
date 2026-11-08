# Commands and events authenticate
Context: Discord developer reference: Commands and events authenticate
[Source](connection-and-command-contracts-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-authorize.md) / [Following source section](commands-and-events-get-guilds.md)
<a id="source-authenticate"></a> <a id="source-authenticate-argument-structure"></a> <a id="source-authenticate-response-structure"></a> <a id="source-oauth2-application-structure"></a> <a id="source-example-authenticate-command-payload"></a> <a id="source-example-authenticate-response-payload"></a>

#### AUTHENTICATE

 Used for authenticate an existing client with your app.

###### Authenticate Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| access_token | string | OAuth2 access token |

###### Authenticate Response Structure

| Field | Type | Description |
| --- | --- | --- |
| user | partial user object | the authed user |
| scopes | array of OAuth2 scopes | authorized scopes |
| expires | date | expiration date of OAuth2 token |
| application | OAuth2 application object | application the user authorized |

###### OAuth2 Application Structure

| Field | Type | Description |
| --- | --- | --- |
| description | string | application description |
| icon | string | hash of the icon |
| id | snowflake | application client id |
| rpc_origins | array of strings | array of rpc origin urls |
| name | string | application name |

###### Example Authenticate Command Payload

```
{
  "nonce": "5bb10a43-1fdc-4391-9512-0c8f4aa203d4",
  "args": {
    "access_token": "CZhtkLDpNYXgPH9Ml6shqh2OwykChw"
  },
  "cmd": "AUTHENTICATE"
}

```

###### Example Authenticate Response Payload

```
{
  "cmd": "AUTHENTICATE",
  "data": {
    "application": {
      "description": "test app description",
      "icon": "d6b51c21c48482d5b64aa4832d92fe14",
      "id": "192741864418312192",
      "rpc_origins": ["http://localhost:3344"],
      "name": "test app"
    },
    "expires": "2017-06-29T19:09:52.361000+00:00",
    "user": {
      "username": "test user",
      "discriminator": "7479",
      "id": "190320984123768832",
      "avatar": "b004ec1740a63ca06ae2e14c5cee11f3"
    },
    "scopes": ["rpc", "identify"]
  },
  "nonce": "5bb10a43-1fdc-4391-9512-0c8f4aa203d4"
}

```

