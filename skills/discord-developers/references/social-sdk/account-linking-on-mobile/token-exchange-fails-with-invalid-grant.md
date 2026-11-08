# Token exchange fails with invalid grant
Context: Discord developer reference: Token exchange fails with invalid grant
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](i-os-authorization-opens-browser-instead-of-discord-app.md) / [Previous source section](android-deep-link-not-working.md) / [Following source section](next-steps.md)
<a id="source-token-exchange-fails-with-invalid_grant"></a>

#### Token Exchange Fails with “invalid_grant”

 **Problem**: Server-side token exchange returns `invalid_grant`. **Solutions**:
1. **Most common**: The token exchange request is missing the `code_verifier` parameter
2. Confirm that you are sending the verifier from `codeVerifier.Verifier()`, not the challenge
3. Confirm that the code has not expired; codes are short-lived
4. Confirm that the redirect URI exactly matches the one used in the authorization request

---

