# Mentionable select modal examples
Context: Discord developer reference: Mentionable select modal examples
[Source](user-role-and-mentionable-selects-index.md) / [Owning endpoint, event, object or procedure conditions](mentionable-select.md) / [Previous source section](mentionable-select-message-response.md) / [Following source section](channel-select.md)

```
{
  "type": 9,
  "data": {
    "custom_id": "mentionable_modal",
    "title": "Unmentionables",
    "components": [
      {
        "type": 18,
        "label": "Who gets mentioned?",
        "component": {
          "type": 7,
          "custom_id": "mentionables_selected",
          "required": true
        }
      }
    ]
  }
}

```

Modal Submit Interaction Data Example

A user submits a modal that includes a Mentionable Select

When a submitted modal includes a Mentionable Select, the interaction data payload follows this basic structure. The complete payload is documented in the [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) reference.

```
{
  "type": 5, // InteractionType.MODAL_SUBMIT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "custom_id": "mentionable_modal",
    "components": [
      {
        "component": {
          "custom_id": "mentionables_selected",
          "id": 2,
          "type": 7,
          "values": [
            "1361539726405926952"
          ]
        },
        "id": 1,
        "type": 18
      }
    ],
    "resolved": {
      "roles": {
        "1361539726405926952": {
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
          "id": "1361539726405926952",
          "managed": false,
          "mentionable": true,
          "name": "Developer",
          "permissions": "0",
          "position": 2,
          "unicode_emoji": "🔧"
        }
      }
    }
  }
}

```

---

