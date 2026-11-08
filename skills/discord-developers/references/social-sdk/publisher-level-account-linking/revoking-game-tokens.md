# Revoking game tokens
Context: Discord developer reference: Revoking game tokens
[Source](publisher-level-account-linking-index.md) / [Previous source section](revoking-publisher-tokens.md) / [Following source section](alternatives-for-publishers-without-a-shared-social-graph.md)
<a id="source-revoking-game-tokens"></a>

### Revoking Game Tokens

 To revoke a game access token, send the game application ID and credentials:

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
CHILD_CLIENT_ID = 'YOUR_CHILD_CLIENT_ID'
CHILD_CLIENT_SECRET = 'YOUR_CHILD_CLIENT_SECRET'

def revoke_child_token(child_token):
    data = {'token': child_token}
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    r = requests.post(
        f'{API_ENDPOINT}/oauth2/token/revoke',
        data=data,
        headers=headers,
        auth=(CHILD_CLIENT_ID, CHILD_CLIENT_SECRET)
    )
    r.raise_for_status()

```

 For token revocation API details and extra options, see [Revoking Access Tokens](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#revoking-access-tokens) in the Account Linking guide.

---

