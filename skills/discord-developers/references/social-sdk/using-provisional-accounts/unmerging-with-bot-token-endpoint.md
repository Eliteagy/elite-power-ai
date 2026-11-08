# Unmerging with bot token endpoint
Context: Discord developer reference: Unmerging with bot token endpoint
[Source](merge-lifecycle-and-clients-index.md) / [Owning endpoint, event, object or procedure conditions](unmerging-provisional-accounts-for-servers.md) / [Following source section](unmerging-provisional-accounts-for-public-clients.md)
<a id="source-unmerging-with-bot-token-endpoint"></a>

#### Unmerging with Bot Token Endpoint

 If authentication uses the [Bot Token Endpoint](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#server-authentication-with-bot-token-endpoint), accounts can be unmerged without an external auth token.

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
BOT_TOKEN = 'YOUR_BOT_TOKEN'

def unmerge_provisional_account(external_user_id):
  data = {
    'external_user_id': external_user_id # identifier used in the /token/bot endpoint
  }
  headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bot {BOT_TOKEN}'
  }
  r = requests.post('%s/partner-sdk/provisional-accounts/unmerge/bot' % API_ENDPOINT, json=data, headers=headers)
  r.raise_for_status()

```

 This endpoint is also useful when the Discord Auth token was lost because of an error or data loss, and an unmerge is needed to move the user to a provisional account before linking Discord again.

