# Displaying a modal
Context: Discord developer reference: Displaying a modal
[Source](components-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](overview-prerequisites.md)
<a id="source-displaying-a-modal"></a>

### Displaying a Modal

 Show a modal as the response to an [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding). Use an [interaction response](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object) with the [`MODAL`](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type) interaction callback type plus the required [modal fields](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-modal). The following example uses a [String Select](https://docs.discord.com/developers/components/reference#string-select) and a [Text Input](https://docs.discord.com/developers/components/reference#text-input), each wrapped in [Labels](https://docs.discord.com/developers/components/reference#label):

```
{
  "type": 9,
  "data": {
    "custom_id": "bug_modal",
    "title": "Bug Report",
    "components": [
      {
        "type": 18,
        "label": "What's your favorite bug?",
        "component": {
          "type": 3,
          "custom_id": "bug_string_select",
          "placeholder": "Choose...",
          "options": [
            {
              "label": "Ant",
              "value": "ant",
              "description": "(best option)",
              "emoji": {
                "name": "🐜"
              }
            },
            {
              "label": "Butterfly",
              "value": "butterfly",
              "emoji": {
                "name": "🦋"
              }
            },
            {
              "label": "Caterpillar",
              "value": "caterpillar",
              "emoji": {
                "name": "🐛"
              }
            }
          ]
        }
      },
      {
        "type": 18,
        "label": "Why is it your favorite?",
        "description": "Please provide as much detail as possible!",
        "component": {
          "type": 4,
          "custom_id": "bug_explanation",
          "style": 2,
          "min_length": 1000,
          "max_length": 4000,
          "placeholder": "Write your explanation here...",
          "required": true
        }
      }
    ]
  }
}

```

 (Figure: Example of an Action Row with three buttons)
