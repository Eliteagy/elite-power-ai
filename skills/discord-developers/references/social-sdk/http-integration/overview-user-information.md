# Overview user information
Context: Discord developer reference: Overview user information
[Source](../marketing/integration-marketing-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](oauth2-token-exchange.md) / [Following source section](using-the-open-api-specification.md)
<a id="source-user-information"></a>

### User Information

 Retrieve details for the authenticated user:

```
def get_user_info(access_token):
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get('https://discord.com/api/v10/users/@me', headers=headers)
    return response.json()

```

---

