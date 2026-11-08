# Client side update token
Context: Discord developer reference: Client side update token
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](server-side-implementation.md) / [Previous source section](server-side-implementation-example-response.md) / [Following source section](working-with-tokens.md)
<a id="source-client-side-update-token"></a>

#### Client-Side: Update Token

 After your server returns the access token, pass it into the SDK:

```
// Receive access token from your server
void OnTokenReceived(const std::string& accessToken) {
  client->UpdateToken(
      discordpp::AuthorizationTokenType::Bearer,
      accessToken,
      [client](discordpp::ClientResult result) {
    if (result.Successful()) {
      client->Connect();
    }
  });
}

```

---

