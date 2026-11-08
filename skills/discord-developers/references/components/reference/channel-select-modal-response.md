# Channel select modal response
Context: Discord developer reference: Channel select modal response
[Source](channel-selects-and-layout-components-index.md) / [Owning endpoint, event, object or procedure conditions](channel-select.md) / [Complete contract setup and permissions](channel-select-message-response-modal-request.md) / [Following source section](section.md)

```
{
  "type": 5, // InteractionType.MODAL_SUBMIT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "custom_id": "channel_modal",
    "components": [
      {
        "component": {
          "custom_id": "channel_selected",
          "id": 2,
          "type": 8,
          "values": [
            "1357483683627663450"
          ]
        },
        "id": 1,
        "type": 18
      }
    ],
    "resolved": {
      "channels": {
        "1357483683627663450": {
          "flags": 0,
          "guild_id": "1111111111111111",
          "id": "1357483683627663450",
          "last_message_id": null,
          "name": "playtesting",
          "nsfw": false,
          "parent_id": "1357129309164404938",
          "permissions": "4503599627370495",
          "position": 1,
          "rate_limit_per_user": 0,
          "topic": null,
          "type": 0
        }
      }
    }
  }
}

```

---

