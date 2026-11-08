# Supported signing algorithms
Context: Discord developer reference: Supported signing algorithms
[Source](authentication-and-merging-index.md) / [Owning endpoint, event, object or procedure conditions](oidc-integration-requirements.md) / [Previous source section](oidc-discovery-document-requirements.md) / [Following source section](id-token-requirements.md)
<a id="source-supported-signing-algorithms"></a>

#### Supported Signing Algorithms

 ID tokens must be signed with an asymmetric algorithm. Discord supports:
| Algorithm family | Algorithms |
| --- | --- |
| RSA | `RS256`, `RS384`, `RS512` |
| ECDSA | `ES256`, `ES384`, `ES512` |
| RSA-PSS | `PS256`, `PS384`, `PS512` |

 Symmetric (HMAC) algorithms such as `HS256` are unsupported. Unsupported entries in `id_token_signing_alg_values_supported` are ignored.

