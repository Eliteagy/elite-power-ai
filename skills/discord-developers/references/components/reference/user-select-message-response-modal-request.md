# User select message response modal request
Context: Discord developer reference: User select message response modal request
[Source](user-role-and-mentionable-selects-index.md) / [Owning endpoint, event, object or procedure conditions](user-select.md) / [Owning endpoint, event, object or procedure conditions](user-select-structure.md) / [Following source section](user-select-modal-response.md)

```
{
  "type": 3, // InteractionType.MESSAGE_COMPONENT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "component_type": 5, // ComponentType.USER_SELECT
    "id": 2,
    "custom_id": "user_select",
    "values": [
      "1111111111111111111",
    ],
    "resolved": {
      "members": {
        "1111111111111111111": {
          "avatar": null,
          "banner": null,
          "collectibles": null,
          "communication_disabled_until": null,
          "flags": 0,
          "joined_at": "2025-05-16T22:51:16.692000+00:00",
          "nick": null,
          "pending": false,
          "permissions": "2248473465835073",
          "premium_since": null,
          "roles": [
            "2222222222222222222"
          ],
          "unusual_dm_activity_until": null
        }
      },
      "users": {
        "1111111111111111111": {
          "avatar": "d54e87d20539fe9aad2f2cebe56809a2",
          "avatar_decoration_data": null,
          "bot": true,
          "clan": null,
          "collectibles": null,
          "discriminator": "9062",
          "display_name_styles": null,
          "global_name": null,
          "id": "1111111111111111111",
          "primary_guild": null,
          "public_flags": 524289,
          "username": "ExampleBot"
        }
      }
    }
  },
}

```

Modal Example

Payload for creating a modal with a User Select component

(Figure: Modal example containing a User Select)

```
{
  "type": 9,
  "data": {
    "custom_id": "user_modal",
    "title": "User Chooser",
    "components": [
      {
        "type": 18, // ComponentType.LABEL
        "label": "Choose your users",
        "component": {
          "type": 5, // ComponentType.USER_SELECT
          "custom_id": "user_selected",
          "max_values": 5,
          "required": true
        }
      }
    ]
  }
}

```

Modal Submit Interaction Data Example

