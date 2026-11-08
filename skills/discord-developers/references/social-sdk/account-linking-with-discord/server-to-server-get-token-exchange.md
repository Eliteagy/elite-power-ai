# Server to server get token exchange
Context: Discord developer reference: Server to server get token exchange
[Source](account-linking-with-discord-index.md) / [Previous source section](receiving-the-authorization-code.md) / [Following source section](authorization-code-token-exchange-response.md)
<a id="source-step-4-exchanging-the-authorization-code-for-an-access-token"></a> <a id="source-server-to-server-get-token-exchange"></a>

### Step 4: Exchanging the Authorization Code for an Access Token

#### Server-to-Server Get Token Exchange

 If your application has a backend server and `Public Client` is not enabled, exchange the authorization code for an access token yourself through the Discord API.

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
CLIENT_ID = 'YOUR_CLIENT_ID'
CLIENT_SECRET = 'YOUR_CLIENT_SECRET'

def exchange_code(code, redirect_uri, code_verifier):
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirect_uri,
        'code_verifier': code_verifier
    }
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    r = requests.post(f'{API_ENDPOINT}/oauth2/token', data=data, headers=headers, auth=(CLIENT_ID, CLIENT_SECRET))
    r.raise_for_status()
    return r.json()

```

