# Server to server token refresh
Context: Discord developer reference: Server to server token refresh
[Source](account-linking-with-discord-index.md) / [Previous source section](refreshing-access-tokens.md) / [Following source section](refreshing-access-tokens-for-public-clients.md)
<a id="source-server-to-server-token-refresh"></a>

### Server-to-Server Token Refresh

 When authentication is handled by your server, refresh the token with an API request.

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
CLIENT_ID = 'YOUR_CLIENT_ID'
CLIENT_SECRET = 'YOUR_CLIENT_SECRET'

def refresh_token(refresh_token):
    data = {
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token
    }
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    r = requests.post(f'{API_ENDPOINT}/oauth2/token', data=data, headers=headers, auth=(CLIENT_ID, CLIENT_SECRET))
    r.raise_for_status()
    return r.json()

```

