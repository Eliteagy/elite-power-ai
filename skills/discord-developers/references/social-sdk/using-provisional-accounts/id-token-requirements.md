# Id token requirements
Context: Discord developer reference: Id token requirements
[Source](authentication-and-merging-index.md) / [Owning endpoint, event, object or procedure conditions](oidc-integration-requirements.md) / [Previous source section](supported-signing-algorithms.md) / [Following source section](provisional-account-access-tokens.md)
<a id="source-id-token-requirements"></a>

#### ID Token Requirements

 The OIDC ID token supplied as `external_auth_token` must meet every requirement below:
| Requirement | Details |
| --- | --- |
| `kid` header | The JWT header needs a `kid` (Key ID) field matching a key in the JWKS. |
| Signing algorithm | Use one of the supported algorithms from the discovery document. |
| `iss` claim | Match the configured issuer URL exactly. |
| `sub` claim | Required; the unique user identifier from the identity provider. |
| `aud` claim | Include the client ID configured for this application in the Developer Portal. |
| `exp` claim | Required; the token must not be expired. |
| `iat` claim | Required; the token must have been issued within the past **7 days**. |

 If present, the optional `preferred_username` claim sets the provisional account display name and must be 1-32 characters.

