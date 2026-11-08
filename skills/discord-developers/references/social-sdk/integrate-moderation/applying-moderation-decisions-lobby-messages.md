# Applying moderation decisions lobby messages
Context: Discord developer reference: Applying moderation decisions lobby messages
[Source](integrate-moderation-index.md) / [Owning endpoint, event, object or procedure conditions](applying-moderation-decisions.md) / [Previous source section](applying-moderation-decisions-dm-messages.md) / [Following source section](moderation-metadata-fields.md)
<a id="source-lobby-messages"></a>

#### Lobby Messages

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
BOT_TOKEN = 'YOUR_BOT_TOKEN'

def apply_lobby_moderation(lobby_id, message_id, metadata):
  r = requests.put(
    f'{API_ENDPOINT}/lobbies/{lobby_id}/messages/{message_id}/moderation-metadata',
    headers={
      'Authorization': f'Bot {BOT_TOKEN}',
      'Content-Type': 'application/json',
    },
    json=metadata
  )
  r.raise_for_status()

# Instruct the client to replace the message content with a policy reminder
metadata = {
  'action': 'replace',  # client will display replacement text instead of the original
  'replacement': 'Be kind to others!',  # the text the client will render in place of the message
}
apply_lobby_moderation(lobby_id, message_id, metadata)

```

 Both endpoints succeed with `HTTP 204: No Content`.

