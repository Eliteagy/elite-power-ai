# Mentionable select message response
Context: Discord developer reference: Mentionable select message response
[Source](user-role-and-mentionable-selects-index.md) / [Owning endpoint, event, object or procedure conditions](mentionable-select.md) / [Following source section](mentionable-select-modal-examples.md)

```
{
  "type": 3, // InteractionType.MESSAGE_COMPONENT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "component_type": 7, // ComponentType.MENTIONABLE_SELECT
    "id": 2,
    "custom_id": "who_to_ping",
    "values": [
      "111111111111111111",
      "222222222222222222",
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
      },
      "roles": {
        "222222222222222222": {
          "color": 12745742,
          "colors": {
            "primary_color": 12745742,
            "secondary_color": null,
            "tertiary_color": null
          },
          "description": null,
          "flags": 0,
          "hoist": false,
          "icon": null,
          "id": "222222222222222222",
          "managed": false,
          "mentionable": true,
          "name": "Developer",
          "permissions": "0",
          "position": 2,
          "unicode_emoji": "🔧"
        }
      }
    }
  },
}

```

Modal Example

Payload for creating a modal with a Mentionable Select component

(Figure: Mentionable Select example produced by the code below)

