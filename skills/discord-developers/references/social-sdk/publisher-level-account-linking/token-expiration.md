# Token expiration
Context: Discord developer reference: Token expiration
[Source](publisher-level-account-linking-index.md) / [Previous source section](token-lifecycles.md) / [Following source section](publisher-token-refresh.md)
<a id="source-token-expiration"></a>

### Token Expiration

 Game token expiration follows the parent publisher token:
- Game tokens expire at the **same time** as the publisher token
- The game token `expires_in` value equals the publisher token's remaining lifetime
- Game tokens do not include refresh tokens

