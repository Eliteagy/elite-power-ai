# Making a guild command
Context: Discord developer reference: Making a guild command
[Source](command-definitions-and-registration-index.md) / [Previous source section](making-a-global-command.md) / [Following source section](updating-and-deleting-a-command.md)
<a id="source-making-a-guild-command"></a>

### Making a Guild Command

 Guild commands are available only in the guild used during creation. They update **instantly**. Use guild commands for fast testing, and switch to global commands when ready for public use. To create a **guild** command, send a similar HTTP POST scoped with a specific `guild_id`:

```
import requests

url = "https://discord.com/api/v10/applications/<my_application_id>/guilds/<guild_id>/commands"

# This is an example USER command, with a type of 2
json = {
    "name": "High Five",
    "type": 2
}

# For authorization, you can use either your bot token
headers = {
    "Authorization": "Bot <my_bot_token>"
}

# or a client credentials token for your app with the applications.commands.update scope
headers = {
    "Authorization": "Bearer <my_credentials_token>"
}

r = requests.post(url, headers=headers, json=json)

```

