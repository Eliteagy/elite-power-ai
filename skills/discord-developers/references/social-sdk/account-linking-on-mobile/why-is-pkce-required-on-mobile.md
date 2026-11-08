# Why is PKCE required on mobile
Context: Discord developer reference: Why is PKCE required on mobile
[Source](account-linking-on-mobile-index.md) / [Previous source section](what-is-pkce.md) / [Following source section](how-pkce-works.md)
<a id="source-why-is-pkce-required-on-mobile"></a>

### Why is PKCE Required on Mobile?

 **Critical Requirement**: Every mobile application that uses custom URL schemes (deep links) must use PKCE, whether it uses a public client or a confidential client with server-side token exchange. Custom URL schemes do not provide the same security guarantees as HTTPS redirects, so PKCE is needed to reduce interception risk.

