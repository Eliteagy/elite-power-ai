# Authentication flow for confidential clients
Context: Discord developer reference: Authentication flow for confidential clients
[Source](account-linking-on-mobile-index.md) / [Previous source section](exchange-authorization-code-for-token.md) / [Following source section](client-side-implementation-create-code-verifier-and-challenge.md)
<a id="source-authentication-flow-for-confidential-clients"></a>

### Authentication Flow for Confidential Clients

 If your application uses a backend server and a confidential client with client secret, mobile still requires PKCE, but your server performs the token exchange.

