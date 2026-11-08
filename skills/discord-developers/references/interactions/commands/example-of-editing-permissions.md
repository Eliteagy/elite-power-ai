# Example of editing permissions
Context: Discord developer reference: Example of editing permissions
[Source](command-definitions-and-registration-index.md) / [Owning endpoint, event, object or procedure conditions](guild-application-command-permissions-structure.md) / [Following source section](slash-commands.md)
<a id="source-example-of-editing-permissions"></a>

###### Example of editing permissions

 For example, this command would be unavailable to everyone except admins in every guild by default:

```
{
    "name": "permissions_test",
    "description": "A test of default permissions",
    "type": 1,
    "default_member_permissions": "0"
}

```

 This version would allow only users with `MANAGE_GUILD` to use it:

```
permissions = str(1 << 5)

command = {
    "name": "permissions_test",
    "description": "A test of default permissions",
    "type": 1,
    "default_member_permissions": permissions
}

```

 This example disables a command in one specific channel:

```
A_SPECIFIC_CHANNEL = "<channel_id>"
url = "https://discord.com/api/v10/applications/<application_id>/guilds/<my_guild_id>/commands/<my_command_id>/permissions"

json = {
    "permissions": [
        {
            "id": A_SPECIFIC_CHANNEL,
            "type": 3,
            "permission": False
        }
    ]
}

headers = {
    "Authorization": "Bearer <my_bearer_token>"
}

r = requests.put(url, headers=headers, json=json)

```

