# Create code verifier and challenge
Context: Discord developer reference: Create code verifier and challenge
[Source](account-linking-on-mobile-index.md) / [Previous source section](authentication-flow-for-public-clients.md) / [Following source section](request-authorization.md)
<a id="source-step-1-create-code-verifier-and-challenge"></a>

### Step 1: Create Code Verifier and Challenge

 Call [`Client::CreateAuthorizationCodeVerifier`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aba6adc1f978e7bf4c5433c560e1ad704) to create the PKCE values:

```
// Generate code verifier and challenge
auto codeVerifier = client->CreateAuthorizationCodeVerifier();

```

