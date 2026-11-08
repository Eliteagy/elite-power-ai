# Configure OAuth2 redirect uri
Context: Discord developer reference: Configure OAuth2 redirect uri
[Source](account-linking-on-mobile-index.md) / [Previous source section](prerequisites.md) / [Following source section](unity-setup.md)
<a id="source-configure-oauth2-redirect-uri"></a>

### Configure OAuth2 Redirect URI

 OAuth2 on mobile requires the correct redirect URI to be registered for your app in the [**Discord Developer Portal**](https://discord.com/developers/applications/select/oauth2).
| Platform | Redirect URI |
| --- | --- |
| **Mobile (iOS & Android)** | `discord-YOUR_APP_ID:/authorize/callback` *(substitute your Discord application ID for `YOUR_APP_ID`)* |

 Use your application ID in the redirect URI format `discord-YOUR_APP_ID:/authorize/callback`. Do not use `http://127.0.0.1/callback` on mobile.

---

