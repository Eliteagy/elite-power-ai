# Client credentials grant
Context: Discord developer reference: Client credentials grant
[Source](scopes-grants-and-installation-index.md) / [Previous source section](implicit-grant.md) / [Following source section](bot-users.md)
<a id="source-client-credentials-grant"></a> <a id="source-client-credentials-token-request-example"></a> <a id="source-client-credentials-access-token-response"></a>

### Client Credentials Grant

 The client credential flow gives bot developers a quick path to bearer tokens for testing. Send a `POST` request to the [token URL](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-urls) using grant type `client_credentials` and Basic authentication, with the client id as the username and client secret as the password. Discord returns an access token for the bot owner. Because of that, treat `client_id` and `client_secret` as sensitive and keep them out of source code. You may provide scopes through the `scope` parameter, a space-separated list of [OAuth2 scopes](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes). Team applications are restricted to `identify` and `applications.commands.update`, because teams are not tied to one specific user.

###### Client Credentials Token Request Example

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
CLIENT_ID = '332269999912132097'
CLIENT_SECRET = '937it3ow87i4ery69876wqire'

def get_token():
  data = {
    'grant_type': 'client_credentials',
    'scope': 'identify connections'
  }
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  r = requests.post('%s/oauth2/token' % API_ENDPOINT, data=data, headers=headers, auth=(CLIENT_ID, CLIENT_SECRET))
  r.raise_for_status()
  return r.json()

```

 The response includes an access token and does not include a refresh token:

###### Client Credentials Access Token Response

```
{
  "access_token": "6qrZcUqja7812RVdnEKjpzOL4CvHBFG",
  "token_type": "Bearer",
  "expires_in": 604800,
  "scope": "identify connections"
}

```

