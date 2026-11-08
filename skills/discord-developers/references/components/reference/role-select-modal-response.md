# Role select modal response
Context: Discord developer reference: Role select modal response
[Source](user-role-and-mentionable-selects-index.md) / [Owning endpoint, event, object or procedure conditions](role-select.md) / [Owning endpoint, event, object or procedure conditions](role-select-message-examples.md) / [Previous source section](role-select-modal-request.md) / [Following source section](mentionable-select.md)

```
{
  "type": 5, // InteractionType.MODAL_SUBMIT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "custom_id": "role_modal",
    "components": [
      {
        "component": {
          "custom_id": "roles_selected",
          "id": 2,
          "type": 6,
          "values": [
            "1362213912946147499",
            "1357409927680889032"
          ]
        },
        "id": 1,
        "type": 18
      }
    ],
    "resolved": {
      "roles": {
        "1357409927680889032": {
          "color": 7419530,
          "colors": {
            "primary_color": 7419530,
            "secondary_color": null,
            "tertiary_color": null
          },
          "description": null,
          "flags": 0,
          "hoist": true,
          "icon": null,
          "id": "1357409927680889032",
          "managed": false,
          "mentionable": true,
          "name": "Player",
          "permissions": "2249596494938111",
          "position": 3,
          "unicode_emoji": "🎮"
        },
        "1362213912946147499": {
          "color": 11342935,
          "colors": {
            "primary_color": 11342935,
            "secondary_color": null,
            "tertiary_color": null
          },
          "description": null,
          "flags": 0,
          "hoist": false,
          "icon": null,
          "id": "1362213912946147499",
          "managed": false,
          "mentionable": false,
          "name": "Mod",
          "permissions": "0",
          "position": 1,
          "unicode_emoji": "🔨"
        }
      }
    }
  }
}

```

---

