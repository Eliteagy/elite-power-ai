# Match confidentiality settings
Context: Discord developer reference: Match confidentiality settings
[Source](publisher-level-account-linking-index.md) / [Previous source section](establish-parent-child-relationships.md) / [Following source section](implementing-token-exchange.md)
<a id="source-4-match-confidentiality-settings"></a>

### 4. Match Confidentiality Settings

 Child applications must use the same confidentiality model as the parent application:
- If the parent is a **confidential client** with a client secret, every child must also be confidential
- If the parent is a **public client**, every child must also be public

---

