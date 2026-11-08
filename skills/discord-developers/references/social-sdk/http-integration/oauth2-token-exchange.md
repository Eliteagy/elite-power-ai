# OAuth2 token exchange
Context: Discord developer reference: OAuth2 token exchange
[Source](../marketing/integration-marketing-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](bearer-token-authentication.md) / [Following source section](overview-user-information.md)
<a id="source-common-api-operations"></a> <a id="source-oauth2-token-exchange"></a>

### Common API Operations

### OAuth2 Token Exchange

 Trade an authorization code for an access token:

```
# filepath: /your/backend/auth.py
import requests

def exchange_code(code, redirect_uri):
    data = {
        'client_id': 'YOUR_CLIENT_ID',
        'client_secret': 'YOUR_CLIENT_SECRET',
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirect_uri
    }

    response = requests.post('https://discord.com/api/v10/oauth2/token', data=data)
    return response.json()

```

