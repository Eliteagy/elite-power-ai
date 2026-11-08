# Unmerging provisional accounts for servers
Context: Discord developer reference: Unmerging provisional accounts for servers
[Source](merge-lifecycle-and-clients-index.md) / [Previous source section](unmerging-provisional-accounts.md) / [Following source section](unmerging-with-bot-token-endpoint.md)
<a id="source-unmerging-provisional-accounts-for-servers"></a>

### Unmerging Provisional Accounts for Servers

 A developer can unmerge a user's account by requesting the Discord API unmerge endpoint.

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
CLIENT_ID = '332269999912132097'
CLIENT_SECRET = '937it3ow87i4ery69876wqire'
EXTERNAL_AUTH_TYPE = 'OIDC'

def unmerge_provisional_account(external_auth_token):
  data = {
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
    'external_auth_type': EXTERNAL_AUTH_TYPE,
    'external_auth_token': external_auth_token
  }
  r = requests.post('%s/partner-sdk/provisional-accounts/unmerge' % API_ENDPOINT, json=data, headers=headers)
  r.raise_for_status()

```

 When a server backend exists, prefer the server-to-server unmerge endpoint over the SDK helper method so the backend keeps stronger security and control of the unmerge flow.

