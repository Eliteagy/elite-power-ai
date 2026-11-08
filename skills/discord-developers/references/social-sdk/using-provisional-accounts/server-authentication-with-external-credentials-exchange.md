# Server authentication with external credentials exchange
Context: Discord developer reference: Server authentication with external credentials exchange
[Source](authentication-and-merging-index.md) / [Previous source section](bot-token-endpoint-response.md) / [Following source section](external-credentials-exchange-response.md)
<a id="source-server-authentication-with-external-credentials-exchange"></a>

### Server Authentication with External Credentials Exchange

```
# filepath: your_game/server/auth.py
import requests

def get_provisional_token(external_token: str):
  response = requests.post(
    'https://discord.com/api/v10/partner-sdk/token',
    json={
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET,
      'external_auth_type': EXTERNAL_AUTH_TYPE,  # See External Auth Types above
      'external_auth_token': external_token
    }
  )
  return response.json()

```

