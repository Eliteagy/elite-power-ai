# Example walkthrough
[Source](subcommands-and-localization-index.md) / [Previous source section](subcommands-and-subcommand-groups.md) / [Following source section](example-walkthrough.md)

<a id="source-example-walkthrough"></a>

### Example Walkthrough

 Consider this scenario: you operate a moderation bot and want a `/permissions` command that can perform these actions:
- Retrieve guild permissions for a user or a role
- Retrieve permissions for a user or a role in one specific channel
- Modify guild permissions for a user or a role
- Modify permissions for a user or a role in one specific channel
 Begin with the top-level definition for `/permissions`:

```
{
    "name": "permissions",
    "description": "Get or edit permissions for a user or a role",
    "options": []
}

```

 (Figure: A command with no arguments. It says /permissions) The command is now named `permissions`. Because it needs to operate on both users and roles, subcommand groups let one command cover both resources instead of requiring two separate commands. In this design, the groups represent the resource being acted on: `user` or `role`.

```
{
    "name": "permissions",
    "description": "Get or edit permissions for a user or a role",
    "options": [
        {
            "name": "user",
            "description": "Get or edit permissions for a user",
            "type": 2 // 2 is type SUB_COMMAND_GROUP
        },
        {
            "name": "role",
            "description": "Get or edit permissions for a role",
            "type": 2
        }
    ]
}

```

 A command in this state **will not appear** in the command explorer, because the groups behave like command folders and both folders are still empty. Continue by adding the `get` and `edit` actions. Since `user` and `role` now act as the folders, define `get` and `edit` subcommands inside each subcommand group:

```
{
    "name": "permissions",
    "description": "Get or edit permissions for a user or a role",
    "options": [
        {
            "name": "user",
            "description": "Get or edit permissions for a user",
            "type": 2, // 2 is type SUB_COMMAND_GROUP
            "options": [
                {
                    "name": "get",
                    "description": "Get permissions for a user",
                    "type": 1 // 1 is type SUB_COMMAND
                },
                {
                    "name": "edit",
                    "description": "Edit permissions for a user",
                    "type": 1
                }
            ]
        },
        {
            "name": "role",
            "description": "Get or edit permissions for a role",
            "type": 2,
            "options": [
                {
                    "name": "get",
                    "description": "Get permissions for a role",
                    "type": 1
                },
                {
                    "name": "edit",
                    "description": "Edit permissions for a role",
                    "type": 1
                }
            ]
        }
    ]
}

```

 (Figure: A command with grouped subcommands. It says /permissions user get) Next, add arguments. Choosing `user` should allow user selection, and choosing `role` should allow role selection. The command also needs to distinguish guild-wide permissions from channel-specific permissions, which can be represented with optional arguments:

That completes the model. The JSON is dense, but the result is one command that narrows first by action, then by resource, then by optional arguments. Here is the assembled command. (Figure: A command with grouped subcommands and parameters. It says /permissions user get with arguments for a user and a channel.)
