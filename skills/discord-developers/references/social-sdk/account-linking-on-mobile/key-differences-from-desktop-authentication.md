# Key differences from desktop authentication
Context: Discord developer reference: Key differences from desktop authentication
[Source](account-linking-on-mobile-index.md) / [Previous source section](overview.md) / [Following source section](prerequisites.md)
<a id="source-key-differences-from-desktop-authentication"></a>

### Key Differences from Desktop Authentication

 Mobile platforms differ from desktop in several important ways:
- **Custom URL schemes** (deep links) are required instead of HTTP redirects
- **PKCE (Proof Key for Code Exchange)** is **mandatory** for every mobile app that uses deep links, whether the client is public or confidential
- **Platform-specific configuration** is required, including Info.plist for iOS and AndroidManifest.xml for Android

