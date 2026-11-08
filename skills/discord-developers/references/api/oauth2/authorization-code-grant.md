# Authorization code grant
Context: Discord developer reference: Authorization code grant
[Source](scopes-grants-and-installation-index.md) / [Previous source section](state-and-security.md) / [Following source section](refresh-token-exchange-example.md)
<a id="source-authorization-code-grant"></a> <a id="source-authorization-url-example"></a> <a id="source-redirect-url-example"></a> <a id="source-access-token-exchange-example"></a> <a id="source-access-token-response"></a>

### Authorization Code Grant

 The authorization code grant is the OAuth2 flow many developers consider the standard path: obtain an authorization code, then exchange it for the user's access token. The authorization server mediates between the client and resource owner, so the resource owner's credentials are not shared directly with the client. Requests to OAuth2 endpoints must use either HTTP Basic authentication or include `client_id` and `client_secret` in the form data body.

###### Authorization URL Example

```
https://discord.com/oauth2/authorize?response_type=code&client_id=157730590492196864&scope=identify%20guilds.join&state=15773059ghq9183habn&redirect_uri=https%3A%2F%2Fnicememe.website&prompt=consent&integration_type=0

```

 `client_id` is the application's `client_id`. `scope` is a list of [OAuth2 scopes](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes) separated by URL-encoded spaces (`%20`). `redirect_uri` is the registered redirect URL for the application, URL-encoded. `state` is the unique value described in [State and Security](https://docs.discord.com/developers/topics/oauth2#state-and-security). Opening this URL prompts the user to authorize the requested scopes. If accepted, Discord redirects to `redirect_uri` with a querystring `code`. If `state` was supplied, it is returned too and should be validated then. `prompt` controls behavior when authorization already exists. With `consent`, a user who already authorized the requested scopes is asked to approve again. With `none`, Discord skips the authorization screen and redirects to the redirect URI without asking again. Passthrough scopes such as `bot` and `webhook.incoming` always require authorization. `integration_type` specifies the [installation context](https://docs.discord.com/developers/resources/application#installation-context). The installation context decides where the application is installed and matters only when `scope` includes `applications.commands`. Value 0 (GUILD_INSTALL) authorizes installation to a server, while value 1 (USER_INSTALL) authorizes installation to a user. The Developer Portal must configure the application to support the requested `integration_type`.

###### Redirect URL Example

```
https://nicememe.website/?code=NhhvTDYsFcdgNLnnLijcl7Ku7bEEeee&state=15773059ghq9183habn

```

 Exchange `code` for the user's access token by sending a `POST` request to the [token URL](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-urls) with these parameters:
- `grant_type` - set this to `authorization_code`
- `code` - the code taken from the querystring
- `redirect_uri` - the `redirect_uri` tied to this authorization, usually the one used in the authorization URL

###### Access Token Exchange Example

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
CLIENT_ID = '332269999912132097'
CLIENT_SECRET = '937it3ow87i4ery69876wqire'
REDIRECT_URI = 'https://nicememe.website'

def exchange_code(code):
  data = {
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': REDIRECT_URI
  }
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  r = requests.post('%s/oauth2/token' % API_ENDPOINT, data=data, headers=headers, auth=(CLIENT_ID, CLIENT_SECRET))
  r.raise_for_status()
  return r.json()

```

 In response, you will receive:

###### Access Token Response

```
{
  "access_token": "6qrZcUqja7812RVdnEKjpzOL4CvHBFG",
  "token_type": "Bearer",
  "expires_in": 604800,
  "refresh_token": "D43f5y0ahjqew82jZ4NViEr2YafMKhue",
  "scope": "identify"
}

```

 With the user's access token, the application can call selected API routes on that user's behalf, limited to the requested scopes. `expires_in` gives the number of seconds until the access token expires, so the app can refresh before expiration. To refresh it, send another `POST` request to the [token URL](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-urls) with these parameters:
- `grant_type` - set this to `refresh_token`
- `refresh_token` - the user's refresh token

