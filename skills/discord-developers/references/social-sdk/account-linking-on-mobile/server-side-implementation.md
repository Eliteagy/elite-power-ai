# Server side implementation
Context: Discord developer reference: Server side implementation
[Source](account-linking-on-mobile-index.md) / [Previous source section](client-side-implementation-request-authorization.md) / [Following source section](server-side-implementation-example-response.md)
<a id="source-server-side-implementation"></a>

### Server-Side Implementation

 Your server must send the `code_verifier` parameter when it exchanges the authorization code for an access token:

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
CLIENT_ID = 'YOUR_CLIENT_ID'
CLIENT_SECRET = 'YOUR_CLIENT_SECRET'

def exchange_code(code, redirect_uri, code_verifier):
    """
    Exchange authorization code for access token with PKCE verification.

    IMPORTANT: The code_verifier parameter is REQUIRED for mobile apps,
    even when using confidential clients with client secrets.
    """
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirect_uri,
        'code_verifier': code_verifier,  # Required for mobile deep links
    }
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    r = requests.post(
        f'{API_ENDPOINT}/oauth2/token',
        data=data,
        headers=headers,
        auth=(CLIENT_ID, CLIENT_SECRET)
    )
    r.raise_for_status()
    return r.json()

```

