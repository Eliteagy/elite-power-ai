# Exchange for child token
Context: Discord developer reference: Exchange for child token
[Source](publisher-level-account-linking-index.md) / [Owning endpoint, event, object or procedure conditions](exchanging-parent-token-for-child-token.md) / [Following source section](token-exchange-response.md)
<a id="source-exchange-for-child-token"></a>

#### Exchange for Child Token

```
import requests

API_ENDPOINT = 'https://discord.com/api/v10'
PARENT_ACCESS_TOKEN = 'parent_token_here'
CHILD_APPLICATION_ID = '987654321098765432'
PARENT_CLIENT_SECRET = 'your_parent_client_secret'

def exchange_for_child_token(parent_token, child_app_id, parent_client_secret):
    response = requests.post(
        f'{API_ENDPOINT}/partner-sdk/child-token',
        headers={
            'Content-Type': 'application/json'
        },
        json={
            'parent_access_token': parent_token,
            'child_application_id': child_app_id,
            'parent_client_secret': parent_client_secret
        }
    )
    response.raise_for_status()
    return response.json()

# Exchange the token
child_token_data = exchange_for_child_token(
    PARENT_ACCESS_TOKEN,
    CHILD_APPLICATION_ID,
    PARENT_CLIENT_SECRET
)

print(f"Child access token: {child_token_data['access_token']}")
print(f"Expires in: {child_token_data['expires_in']} seconds")

```

