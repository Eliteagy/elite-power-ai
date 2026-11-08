# Role select modal request
Context: Discord developer reference: Role select modal request
[Source](user-role-and-mentionable-selects-index.md) / [Owning endpoint, event, object or procedure conditions](role-select.md) / [Owning endpoint, event, object or procedure conditions](role-select-message-examples.md) / [Following source section](role-select-modal-response.md)

```
{
  "type": 9,
  "data": {
    "custom_id": "role_modal",
    "title": "Role Select",
    "components": [
      {
        "type": 18,
        "label": "Select which roles to assign",
        "component": {
          "type": 6,
          "custom_id": "roles_selected",
          "max_values": 10,
          "required": true
        }
      }
    ]
  }
}

```

Modal Submit Interaction Data Example

A user submits a modal that includes a Role Select

When a submitted modal includes a Role Select, the interaction data payload uses this basic shape. See the [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) reference for the full payload.

