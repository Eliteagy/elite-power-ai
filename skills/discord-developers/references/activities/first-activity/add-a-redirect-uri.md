# Add a redirect uri
Context: Discord developer reference: Add a redirect uri
[Source](project-and-authentication-index.md) / [Previous source section](choose-installation-contexts.md) / [Following source section](fetch-your-oauth2-credentials.md)
<a id="source-add-a-redirect-uri"></a>

### Add a Redirect URI

 Add a Redirect URI, the location a user is normally sent to after authorizing your app through the standard OAuth flow. The Redirect URI is required, but the Embedded App SDK sends users back to the Activity automatically when the RPC [`authorize` command](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#authorize) runs. The [OAuth2 documentation](https://docs.discord.com/developers/topics/oauth2) explains the OAuth flow and redirect URIs. Because this guide authorizes only inside an Activity, use `https://127.0.0.1` as a placeholder and let the Embedded App SDK handle the return path. In the app settings, open [**OAuth2**](https://discord.com/developers/applications/select/oauth2). Under **Redirects**, enter `https://127.0.0.1` then click **Save Changes**. (Figure: Redirect URI in Activity Settings)

