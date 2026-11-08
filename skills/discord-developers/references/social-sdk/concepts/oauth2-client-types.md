# OAuth2 client types
Context: Discord developer reference: OAuth2 client types
[Source](linking-permissions-and-support-index.md) / [Owning endpoint, event, object or procedure conditions](default-presence-scopes.md) / [Previous source section](default-communication-scopes.md) / [Following source section](default-presence-scopes-next-steps.md)
<a id="source-oauth2-client-types"></a>

### OAuth2 Client Types

 OAuth2 clients are either **Confidential** or **Public**. Most games should avoid shipping with **Public Client** enabled. Some Social SDK methods require a Discord application configured as a **Public Client**, but server-side alternatives exist for **Confidential Client** integrations.
- Production applications are generally better served by confidential clients with properly protected secrets.
- Public clients cannot securely store client secrets.
- Have the security team review this setting and the authentication flows before release.
 [Learn more about OAuth2 client types](https://oauth.net/2/client-types)

---

