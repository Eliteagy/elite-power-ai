# Oidc discovery document requirements
Context: Discord developer reference: Oidc discovery document requirements
[Source](authentication-and-merging-index.md) / [Owning endpoint, event, object or procedure conditions](oidc-integration-requirements.md) / [Previous source section](issuer-url-requirements.md) / [Following source section](supported-signing-algorithms.md)
<a id="source-oidc-discovery-document-requirements"></a>

#### OIDC Discovery Document Requirements

 Discord loads OIDC configuration from `{issuer_url}/.well-known/openid-configuration` according to [RFC 8414](https://www.rfc-editor.org/rfc/rfc8414). This endpoint must:
- Be accessible over HTTPS
- **Not require HTTP redirects**; Discord does not follow redirects for this document or the JWKS endpoint
- Return a valid JSON object rather than an array
 The discovery document must contain these fields:
| Field | Type | Requirement |
| --- | --- | --- |
| `issuer` | HTTPS URL | Must exactly equal the issuer URL used to request the document. |
| `jwks_uri` | HTTPS URL | URI for the JWKS signing key endpoint. |
| `id_token_signing_alg_values_supported` | Array of strings | Must list at least one supported algorithm. |

 `authorization_endpoint` and `token_endpoint` may be present, but Discord does not use them.

