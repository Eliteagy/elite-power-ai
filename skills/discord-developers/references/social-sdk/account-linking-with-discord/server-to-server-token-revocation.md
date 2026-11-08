# Server to server token revocation
Context: Discord developer reference: Server to server token revocation
[Source](account-linking-with-discord-index.md) / [Previous source section](revoking-access-tokens.md) / [Following source section](revoking-access-tokens-for-public-clients.md)
<a id="source-server-to-server-token-revocation"></a>

### Server-to-Server Token Revocation

 Applications with backend servers can revoke tokens by sending an API request to Discord's token revocation endpoint.

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
CLIENT_ID = 'YOUR_CLIENT_ID'
CLIENT_SECRET = 'YOUR_CLIENT_SECRET'

def revoke_token(access_or_refresh_token):
    data = {'token': access_or_refresh_token}
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    r = requests.post(f'{API_ENDPOINT}/oauth2/token/revoke', data=data, headers=headers, auth=(CLIENT_ID, CLIENT_SECRET))
    r.raise_for_status()

```

