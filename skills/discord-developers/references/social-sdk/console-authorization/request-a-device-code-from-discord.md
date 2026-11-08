# Request a device code from discord
Context: Discord developer reference: Request a device code from discord
[Source](../entry-points/entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](manual-flow-for-console-authorization.md) / [Following source section](request-a-device-code-from-discord-example-response.md)
<a id="source-step-1-request-a-device-code-from-discord"></a>

### Step 1: Request a Device Code from Discord

 The game needs to request both a device code and a user code from the Discord API.

```
import requests

API_ENDPOINT = "https://discord.com/api/v10"
CLIENT_ID = "YOUR_CLIENT_ID"
CLIENT_SECRET = "YOUR_CLIENT_SECRET"
SCOPE = "sdk.social_layer"

def authorize_device():
    data = {"scope": SCOPE}
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    response = requests.post(f"{API_ENDPOINT}/oauth2/device/authorize", data=data, headers=headers, auth=(CLIENT_ID, CLIENT_SECRET))
    response.raise_for_status()
    return response.json()

```

