# How PKCE works
Context: Discord developer reference: How PKCE works
[Source](account-linking-on-mobile-index.md) / [Previous source section](why-is-pkce-required-on-mobile.md) / [Following source section](authentication-flow-for-public-clients.md)
<a id="source-how-pkce-works"></a>

### How PKCE Works

1. **Client generates a code verifier**: A cryptographically random string
2. **Client creates a code challenge**: A hashed form of the verifier
3. **Client sends code challenge** with the authorization request
4. **Server stores the code challenge** with the authorization code
5. **Client provides the code verifier** during the authorization-code-to-token exchange
6. **Server verifies** that the verifier matches the stored challenge
 The Discord Social SDK generates the code verifier and challenge for you through [`Client::CreateAuthorizationCodeVerifier`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aba6adc1f978e7bf4c5433c560e1ad704).

---

