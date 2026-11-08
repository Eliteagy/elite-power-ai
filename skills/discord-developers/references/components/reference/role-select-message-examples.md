# Role select message examples
Context: Discord developer reference: Role select message examples
[Source](user-role-and-mentionable-selects-index.md) / [Owning endpoint, event, object or procedure conditions](role-select.md) / [Following source section](role-select-modal-request.md)
<a id="source-examples-1"></a>

###### Examples

Message Example

Payload for creating a message with a Role Select component

(Figure: Role Select example allowing as many as 3 choices)

```
{
  "flags": 32768,
  "components": [
    {
      "type": 1,  // ComponentType.ACTION_ROW
      "components": [
        {
          "type": 6,  // ComponentType.ROLE_SELECT
          "custom_id": "role_ids",
          "placeholder": "Which roles?",
          "min_values": 1,
          "max_values": 3
        }
      ]
    }
  ]
}

```

Message Interaction Data Example

A user chooses an option in a message Role Select

When a user uses a Role Select in a message, the interaction data payload follows this basic structure. The complete payload is documented in the [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) reference.

```
{
  "type": 3, // InteractionType.MESSAGE_COMPONENT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "component_type": 6, // ComponentType.ROLE_SELECT
    "id": 2,
    "custom_id": "role_ids",
    "values": [
      "222222222222222222",
    ],
    "resolved": {
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

Payload for creating a modal with a Role Select component

(Figure: Modal example containing a Role Select)

