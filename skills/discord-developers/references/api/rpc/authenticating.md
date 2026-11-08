# Authenticating
Context: Discord developer reference: Authenticating
[Source](connection-and-command-contracts-index.md) / [Previous source section](payloads-payload-structure.md) / [Following source section](commands-and-events.md)
<a id="source-authenticating"></a> <a id="source-rpc-authorize-example"></a> <a id="source-rpc-authenticate-example"></a>

### Authenticating

 RPC commands require authentication; otherwise Discord responds with code `4006`. Start by calling [AUTHORIZE](https://docs.discord.com/developers/topics/rpc#authorize):

###### RPC Authorize Example

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

 The user can then be prompted to authorize your app to access RPC on Discord. `AUTHORIZE` provides a `code` that you can exchange with a POST to `https://discord.com/api/oauth2/token` covering the [standard OAuth2 body parameters](https://tools.ietf.org/html/rfc6749#section-4.1.3) for this token exchange. The token route on our API returns an `access_token` that may be delivered with [AUTHENTICATE](https://docs.discord.com/developers/topics/rpc#authenticate):

###### RPC Authenticate Example

```
{
  "nonce": "5bb10a43-1fdc-4391-9512-0c8f4aa203d4",
  "args": {
    "access_token": "CZhtkLDpNYXgPH9Ml6shqh2OwykChw"
  },
  "cmd": "AUTHENTICATE"
}

```

 You can now call RPC commands on behalf for the authorized user!

