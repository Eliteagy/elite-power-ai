# Configure OAuth2 redirects
Context: Discord developer reference: Configure OAuth2 redirects
[Source](account-linking-with-discord-index.md) / [Previous source section](oauth2-using-the-discord-social-sdk.md) / [Following source section](request-authorization.md)
<a id="source-requesting-access-tokens"></a> <a id="source-step-0-configure-oauth2-redirects"></a>

### Requesting Access Tokens

### Step 0: Configure OAuth2 Redirects

 OAuth2 works only when your app has the correct redirect URIs registered in the [**Discord Developer Portal**](https://discord.com/developers/applications/select/oauth2).
| Platform | Redirect URI |
| --- | --- |
| **Desktop** | `http://127.0.0.1/callback` |
| **Mobile** | `discord-APP_ID:/authorize/callback` *(substitute your Discord application ID for `APP_ID`)* |

