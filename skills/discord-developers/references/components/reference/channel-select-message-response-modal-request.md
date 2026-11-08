# Channel select message response modal request
Context: Discord developer reference: Channel select message response modal request
[Source](channel-selects-and-layout-components-index.md) / [Owning endpoint, event, object or procedure conditions](channel-select.md) / [Following source section](channel-select-modal-response.md)
<a id="source-reference-part-3"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

```
{
  "type": 3, // InteractionType.MESSAGE_COMPONENT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "component_type": 8, // ComponentType.CHANNEL_SELECT
    "id": 2,
    "custom_id": "notification_channel",
    "values": [
      "333333333333333333",
    ],
    "resolved": {
      "channels": {
        "333333333333333333": {
          "flags": 0,
          "guild_id": "44444444444444444",
          "id": "333333333333333333",
          "last_message_id": null,
          "name": "playtesting",
          "nsfw": false,
          "parent_id": "5555555555555555",
          "permissions": "4503599627370495",
          "position": 1,
          "rate_limit_per_user": 0,
          "topic": null,
          "type": 0  // ChannelType.TEXT
        }
      }
    }
  },
}

```

Modal Example

Modal create payload with a Channel Select component

(Figure: Example of a modal with a Channel Select)

```
{
  "type": 9,
  "data": {
    "custom_id": "channel_modal",
    "title": "Lockdown",
    "components": [
      {
        "type": 18,
        "label": "Which channel should be locked?",
        "component": {
          "type": 8,
          "custom_id": "channel_selected",
          "required": true
        }
      }
    ]
  }
}

```

Modal Submit Interaction Data Example

Once one user submits a modal covering a Channel Select

Once one user submits a modal that includes a Channel Select, this is the basic form for the interaction data payload you receive. The full payload is available within the [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) reference.

