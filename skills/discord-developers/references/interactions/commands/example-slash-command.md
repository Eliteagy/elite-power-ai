# Example slash command
Context: Discord developer reference: Example slash command
[Source](subcommands-and-localization-index.md) / [Owning endpoint, event, object or procedure conditions](slash-commands.md) / [Following source section](slash-commands-example-interaction.md)
<a id="source-application-commands-part-2"></a> <a id="source-example-slash-command"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

###### Example Slash Command

```
{
    "name": "blep",
    "type": 1,
    "description": "Send a random adorable animal photo",
    "options": [
        {
            "name": "animal",
            "description": "The type of animal",
            "type": 3,
            "required": true,
            "choices": [
                {
                    "name": "Dog",
                    "value": "animal_dog"
                },
                {
                    "name": "Cat",
                    "value": "animal_cat"
                },
                {
                    "name": "Penguin",
                    "value": "animal_penguin"
                }
            ]
        },
        {
            "name": "only_smol",
            "description": "Whether to show only baby animals",
            "type": 5,
            "required": false
        }
    ]
}

```

 When a user invokes a slash command, Discord sends your application an interaction:

