# Server authentication with bot token endpoint
Context: Discord developer reference: Server authentication with bot token endpoint
[Source](authentication-and-merging-index.md) / [Previous source section](implementing-provisional-accounts.md) / [Following source section](bot-token-endpoint-response.md)
<a id="source-server-authentication-with-bot-token-endpoint"></a>

### Server Authentication with Bot Token Endpoint

 This preferred authentication method is usually the simplest option for provisional account integrations.

```
# filepath: your_game/server/auth.py
import requests
from models import GameAccount

def get_provisional_token(game_account: GameAccount):
  response = requests.post(
    'https://discord.com/api/v10/partner-sdk/token/bot',
    headers={
      'Content-Type': 'application/json',
      'Authorization': 'Bot <BOT_TOKEN>' # your application's bot token
    },
    json={
      'external_user_id': game_account.id,       # your account system's unique id
      'preferred_global_name': game_account.display_name, # your account system's display name for the user
    }
  )
  return response.json()

```

