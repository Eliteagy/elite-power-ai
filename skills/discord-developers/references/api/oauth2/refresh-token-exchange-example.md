# Refresh token exchange example
Context: Discord developer reference: Refresh token exchange example
[Source](scopes-grants-and-installation-index.md) / [Owning endpoint, event, object or procedure conditions](authorization-code-grant.md) / [Following source section](implicit-grant.md)
<a id="source-refresh-token-exchange-example"></a> <a id="source-token-revocation-example"></a>

###### Refresh Token Exchange Example

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
CLIENT_ID = '332269999912132097'
CLIENT_SECRET = '937it3ow87i4ery69876wqire'

def refresh_token(refresh_token):
  data = {
    'grant_type': 'refresh_token',
    'refresh_token': refresh_token
  }
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  r = requests.post('%s/oauth2/token' % API_ENDPOINT, data=data, headers=headers, auth=(CLIENT_ID, CLIENT_SECRET))
  r.raise_for_status()
  return r.json()

```

 Boom; fresh [access token response](https://docs.discord.com/developers/topics/oauth2#authorization-code-grant-access-token-response)!

###### Token Revocation Example

 Revoke an access token or refresh token by sending a `POST` request to the [token revocation URL](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-urls) with these parameters:
- `token` - the access token or refresh token being revoked
- `token_type_hint` *(optional)* - indicates the kind of `token`; either `access_token` or `refresh_token`
 Revoking a token revokes every active access token and refresh token associated with that authorization, no matter what `token` or `token_type_hint` values you send.

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
CLIENT_ID = '332269999912132097'
CLIENT_SECRET = '937it3ow87i4ery69876wqire'

def revoke_access_token(access_token):
  data = {
    'token': access_token,
    'token_type_hint': 'access_token'
  }
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  requests.post('%s/oauth2/token/revoke' % API_ENDPOINT, data=data, headers=headers, auth=(CLIENT_ID, CLIENT_SECRET))

```

 The related tokens are now revoked.

