# Exchange device code for access token
Context: Discord developer reference: Exchange device code for access token
[Source](../entry-points/entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](poll-for-user-s-authorization.md) / [Following source section](handle-token-response.md)
<a id="source-step-4-exchange-device-code-for-access-token"></a>

### Step 4: Exchange Device Code for Access Token

 After Discord authentication is complete, exchange the device code for an access token.

```
def exchange_device_code(device_code):
    data = {
        "grant_type": "urn:ietf:params:oauth:grant-type:device_code",
        "device_code": device_code
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    response = requests.post(f"{API_ENDPOINT}/oauth2/token", data=data, headers=headers, auth=(CLIENT_ID, CLIENT_SECRET))
    response.raise_for_status()
    return response.json()

```

