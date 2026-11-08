# Desktop mobile request body parameters
Context: Discord developer reference: Desktop mobile request body parameters
[Source](authentication-and-merging-index.md) / [Owning endpoint, event, object or procedure conditions](merging-provisional-accounts-for-servers.md) / [Following source section](console-request-body-parameters.md)
<a id="source-desktop--mobile"></a> <a id="source-request-body-parameters"></a>

#### Desktop & Mobile

###### Request Body Parameters

| Parameter | Description |
| --- | --- |
| `grant_type` | Must be `authorization_code`. This standard OAuth2 authorization code grant exchanges the authorization code from `Client::Authorize` for an access token. |
| `code` | Authorization code returned to the server after the user completes `Client::Authorize`. |
| `redirect_uri` | Redirect URI from the original authorization request. It must match exactly. |
| `external_auth_type` | External identity provider type. See External Auth Types. |
| `external_auth_token` | External identity token. For `OIDC`, provide the OIDC identity token. For `DISCORD_BOT_ISSUED_ACCESS_TOKEN`, provide the `external_user_id` (game account ID) that created the provisional account. |

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
CLIENT_ID = '332269999912132097'
CLIENT_SECRET = '937it3ow87i4ery69876wqire'
# See External Auth Types above for all supported values
EXTERNAL_AUTH_TYPE = 'DISCORD_BOT_ISSUED_ACCESS_TOKEN'

def exchange_code_with_merge(code, redirect_uri, code_verifier, external_auth_token):
  data = {
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': redirect_uri,
    'code_verifier': code_verifier,
    'external_auth_type': EXTERNAL_AUTH_TYPE,
    'external_auth_token': external_auth_token
  }
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  r = requests.post('%s/oauth2/token' % API_ENDPOINT, data=data, headers=headers, auth=(CLIENT_ID, CLIENT_SECRET))
  r.raise_for_status()
  return r.json()

```

