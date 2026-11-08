# Client side implementation create code verifier and challenge
Context: Discord developer reference: Client side implementation create code verifier and challenge
[Source](account-linking-on-mobile-index.md) / [Previous source section](authentication-flow-for-confidential-clients.md) / [Following source section](client-side-implementation-request-authorization.md)
<a id="source-client-side-implementation"></a> <a id="source-step-1-create-code-verifier-and-challenge-1"></a>

### Client-Side Implementation

#### Step 1: Create Code Verifier and Challenge

 Generate the PKCE values on the client:

```
// Generate code verifier and challenge
auto codeVerifier = client->CreateAuthorizationCodeVerifier();

```

