# Console request body parameters
[Source](authentication-and-merging-index.md) / [Owning endpoint, event, object or procedure conditions](merging-provisional-accounts-for-servers.md) / [Continued source contract](console-request-body-parameters.md) / [Previous source section](desktop-mobile-request-body-parameters.md)

<a id="source-console"></a> <a id="source-request-body-parameters-1"></a>

#### Console

###### Request Body Parameters

| Parameter | Description |
| --- | --- |
| `grant_type` | Must be `urn:ietf:params:oauth:grant-type:device_code`. This RFC 8628 device authorization grant is used for consoles and devices without a browser. |
| `device_code` | Device code from the device authorization flow. See Account Linking on Consoles. |
| `external_auth_type` | External identity provider type. See External Auth Types. |
| `external_auth_token` | External identity token. For `OIDC`, provide the OIDC identity token. For `DISCORD_BOT_ISSUED_ACCESS_TOKEN`, provide the `external_user_id` (game account ID) that created the provisional account. |

<a id="source-using-provisional-accounts-part-2"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
CLIENT_ID = '332269999912132097'
CLIENT_SECRET = '937it3ow87i4ery69876wqire'
# See External Auth Types above for all supported values
EXTERNAL_AUTH_TYPE = 'DISCORD_BOT_ISSUED_ACCESS_TOKEN'

def exchange_device_code_with_merge(device_code, external_auth_token):
  data = {
    'grant_type': 'urn:ietf:params:oauth:grant-type:device_code',
    'device_code': device_code,
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
