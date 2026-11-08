# Commands and events authorize
Context: Discord developer reference: Commands and events authorize
[Source](connection-and-command-contracts-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Following source section](commands-and-events-authenticate.md)
<a id="source-authorize"></a> <a id="source-authorize-argument-structure"></a> <a id="source-authorize-response-structure"></a> <a id="source-example-authorize-command-payload"></a> <a id="source-example-authorize-response-payload"></a>

#### AUTHORIZE

 AUTHORIZE authenticates a new client with your app. By default, Discord shows an in-app modal asking the user account to grant access. **RPC access for unapproved apps is limited to users on the game?s tester list**. Discord provides 50 tester slots for development. After approval, the restriction is removed and the app can be used broadly. Approved games and tester-list users may use the RPC token flow to skip the user authorization modal; that flow also blocks the `messages.read` scope. If access is granted, send a POST request to `https://discord.com/api/oauth2/token/rpc` with the application?s `client_id` and `client_secret` in a url-encoded body, **not JSON**. Put the returned `rpc_token` into the `rpc_token` field of the RPC authorize request documented below.

###### Authorize Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| scopes | array of OAuth2 scopes | scopes to authorize |
| client_id | string | OAuth2 application id |
| rpc_token | string | one-time use RPC token |
| username | string | username to create a guest account with once the user account does not have Discord |

###### Authorize Response Structure

| Field | Type | Description |
| --- | --- | --- |
| code | string | OAuth2 authorization code |

###### Example Authorize Command Payload

```
{
  "nonce": "f48f6176-4afb-4c03-b1b8-d960861f5216",
  "args": {
    "client_id": "192741864418312192",
    "scopes": ["rpc", "identify"]
  },
  "cmd": "AUTHORIZE"
}

```

###### Example Authorize Response Payload

```
{
  "cmd": "AUTHORIZE",
  "data": {
    "code": "O62Q9JzFe8BEOUzIfsAndOjNd2V4sJ"
  },
  "nonce": "f48f6176-4afb-4c03-b1b8-d960861f5216"
}

```

