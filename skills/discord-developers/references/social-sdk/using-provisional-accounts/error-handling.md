# Error handling
Context: Discord developer reference: Error handling
[Source](authentication-and-merging-index.md) / [Previous source section](provisional-account-access-token-storage.md) / [Following source section](setting-display-names.md)
<a id="source-error-handling"></a>

### Error Handling

 Common server token exchange error codes and fixes:
| Code | Meaning | Solution |
| --- | --- | --- |
| 530000 | Application not configured | Ask Discord support to enable provisional accounts for the application. |
| 530001 | Expired ID token | Request a fresh token from the identity provider. |
| 530004 | Token too old | Request a fresh token; tokens older than 1 week are rejected. |
| 530006 | Username generation failed | Retry the operation (temporary error) |
| 530007 | Invalid client secret | Check or regenerate the client secret in the Developer Portal. |
| 530010 | User account non-provisional | The user is already linked to a Discord account; use the standard OAuth2 flow. |

 OIDC integrations may return more specific errors:
| Code | Meaning | Solution |
| --- | --- | --- |
| 530002 | Invalid issuer | Check that the `iss` claim in the ID token exactly matches the issuer URL in the OIDC configuration. |
| 530003 | Invalid audience | Check that the `aud` claim in the ID token includes the client ID from the OIDC configuration. |
| 530008 | OIDC configuration not found | Confirm the issuer URL is correct, reachable over HTTPS, and serves a valid discovery document without HTTP redirects. |
| 530009 | OIDC JWKS not found | Confirm the JWKS endpoint is reachable over HTTPS without HTTP redirects. |
| 530020 | Invalid OIDC JWT token | Confirm the ID token is signed correctly and uses a supported algorithm. |
| 530027 | Missing `kid` header | Make sure the ID token JWT header includes `kid` (Key ID) identifying the signing key. |

---

