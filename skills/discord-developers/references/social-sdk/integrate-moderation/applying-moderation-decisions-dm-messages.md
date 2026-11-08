# Applying moderation decisions dm messages
Context: Discord developer reference: Applying moderation decisions dm messages
[Source](integrate-moderation-index.md) / [Owning endpoint, event, object or procedure conditions](applying-moderation-decisions.md) / [Following source section](applying-moderation-decisions-lobby-messages.md)
<a id="source-dm-messages"></a>

#### DM Messages

 `user_id_1` and `user_id_2` identify the DM participants, and either order is valid.

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
BOT_TOKEN = 'YOUR_BOT_TOKEN'

def apply_dm_moderation(user_id_1, user_id_2, message_id, metadata):
  r = requests.put(
    f'{API_ENDPOINT}/partner-sdk/dms/{user_id_1}/{user_id_2}/messages/{message_id}/moderation-metadata',
    headers={
      'Authorization': f'Bot {BOT_TOKEN}',
      'Content-Type': 'application/json',
    },
    json=metadata
  )
  r.raise_for_status()

# Instruct the client to hide this message — moderation service flagged it as toxic
metadata = {
  'action': 'hide',   # client will not render this message
  'reason': 'toxicity',  # logged by the client for reporting purposes
}
apply_dm_moderation(user_id_1, user_id_2, message_id, metadata)

# Alternatively, instruct the client to show this message — moderation service approved it
metadata = {
  'action': 'show',  # client will render the message normally
}
apply_dm_moderation(user_id_1, user_id_2, message_id, metadata)

```

