# OAuth2 using the discord social SDK
Context: Discord developer reference: OAuth2 using the discord social SDK
[Source](account-linking-with-discord-index.md) / [Previous source section](our-authentication-flow.md) / [Following source section](configure-oauth2-redirects.md)
<a id="source-oauth2-using-the-discord-social-sdk"></a>

### OAuth2 using the Discord Social SDK

- If the Discord client supports the [overlay](https://support.discord.com/hc/en-us/articles/217659737-Game-Overlay-101) on Windows, the OAuth2 login modal appears inside the game instead of opening a browser.
- The SDK handles redirects automatically, which reduces the authentication plumbing you need to write.
- Built-in protections include measures such as CSRF defense, but your app should still follow security best practices.

---

