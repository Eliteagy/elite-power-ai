# Trusting client data
Context: Discord developer reference: Trusting client data
[Source](participants-avatars-and-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](activity-proxy-considerations.md) / [Previous source section](using-external-resources.md) / [Following source section](security-considerations-using-cookies.md)
<a id="source-security-considerations"></a> <a id="source-trusting-client-data"></a>

### Security Considerations

#### Trusting Client Data

 Treat data from the Discord client as untrusted. It may be useful locally in your app, but assume anything from the Discord Client can be forged, including the current user, Nitro status, current channel, and similar context. For trusted values, call the Discord API from your application server using the OAuth2 user token. Also remember that Discord client data is not pre-sanitized. Usernames, channel names, and similar strings are arbitrary user input, so sanitize them or render them safely with `.textContent`, for example.

