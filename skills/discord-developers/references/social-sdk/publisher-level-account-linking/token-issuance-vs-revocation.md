# Token issuance vs revocation
Context: Discord developer reference: Token issuance vs revocation
[Source](publisher-level-account-linking-index.md) / [Previous source section](revoking-access-tokens.md) / [Following source section](revoking-publisher-tokens.md)
<a id="source-token-issuance-vs-revocation"></a>

### Token Issuance vs. Revocation

 Game tokens are issued under publisher authority, but revocation uses different application identity rules:
- **Game tokens are issued by the publisher application** - The `/partner-sdk/child-token` endpoint relies on publisher application credentials when issuing game tokens
- **Revocation uses the token's associated application ID**:
  - **Publisher token revocation** -> Use the **parent publisher application ID**
  - **Game token revocation** -> Use the **child game application ID**

 When revoking a token, choose the application ID represented by that token, not the application ID that originally issued it.

