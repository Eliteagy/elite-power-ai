# User select modal response
Context: Discord developer reference: User select modal response
[Source](user-role-and-mentionable-selects-index.md) / [Owning endpoint, event, object or procedure conditions](user-select.md) / [Owning endpoint, event, object or procedure conditions](user-select-structure.md) / [Previous source section](user-select-message-response-modal-request.md) / [Following source section](role-select.md)

A user submits a modal that includes a User Select

When a submitted modal includes a User Select, the interaction data payload follows this basic form. The complete payload is documented in the [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) reference.

```
{
  "type": 5, // InteractionType.MODAL_SUBMIT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "custom_id": "user_modal",
    "components": [
      {
        "component": {
          "custom_id": "user_selected",
          "id": 2,
          "type": 5,
          "values": [
            "11111111111111111"
          ]
        },
        "id": 1,
        "type": 18
      }
    ],
    "resolved": {
      "members": {
        "11111111111111111": {
          "avatar": null,
          "banner": null,
          "collectibles": null,
          "communication_disabled_until": null,
          "flags": 0,
          "joined_at": "2025-04-02T23:07:21.476000+00:00",
          "nick": "Ant",
          "pending": false,
          "permissions": "4503599627370495",
          "premium_since": null,
          "roles": [
            "1357409927680889032"
          ],
          "unusual_dm_activity_until": null
        }
      },
      "users": {
        "11111111111111111": {
          "avatar": "a_b15bd8ee42e3c3d9a7de129fee60bc84",
          "avatar_decoration_data": null,
          "clan": null,
          "collectibles": {
            "nameplate": {
              "asset": "nameplates/spell/white_mana/",
              "expires_at": null,
              "label": "COLLECTIBLES_SPELL_WHITE_MANA_NP_A11Y",
              "palette": "bubble_gum",
              "sku_id": "1379220459203072050"
            }
          },
          "discriminator": "0",
          "display_name_styles": {
            "colors": [
              16777215
            ],
            "effect_id": 4,
            "font_id": 3
          },
          "global_name": "Anthony",
          "id": "11111111111111111",
          "primary_guild": null,
          "public_flags": 65,
          "username": "actuallyanthony"
        }
      }
    }
  }
}

```

---

