# Revoking publisher tokens
Context: Discord developer reference: Revoking publisher tokens
[Source](publisher-level-account-linking-index.md) / [Previous source section](token-issuance-vs-revocation.md) / [Following source section](revoking-game-tokens.md)
<a id="source-revoking-publisher-tokens"></a>

### Revoking Publisher Tokens

 To revoke a publisher access token, send the publisher application ID and credentials:

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
PARENT_CLIENT_ID = 'YOUR_PARENT_CLIENT_ID'
PARENT_CLIENT_SECRET = 'YOUR_PARENT_CLIENT_SECRET'

def revoke_parent_token(parent_token):
    data = {'token': parent_token}
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    r = requests.post(
        f'{API_ENDPOINT}/oauth2/token/revoke',
        data=data,
        headers=headers,
        auth=(PARENT_CLIENT_ID, PARENT_CLIENT_SECRET)
    )
    r.raise_for_status()

```

 Revoking a publisher token invalidates all publisher access and refresh tokens for that user and also **immediately invalidates all associated game tokens**. Any SDK session using a game token is disconnected.

