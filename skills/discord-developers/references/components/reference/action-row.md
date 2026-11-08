# Action row
Context: Discord developer reference: Action row
[Source](buttons-and-select-menus-index.md) / [Previous source section](anatomy-of-a-component.md) / [Following source section](button.md)
<a id="source-action-row"></a> <a id="source-action-row-structure"></a> <a id="source-action-row-child-components"></a> <a id="source-examples"></a>

### Action Row

 An Action Row is a top-level layout component. It may contain one of these sets:
- Up to 5 contextually related [buttons](https://docs.discord.com/developers/components/reference#button)
- One select component: [string select](https://docs.discord.com/developers/components/reference#string-select), [user select](https://docs.discord.com/developers/components/reference#user-select), [role select](https://docs.discord.com/developers/components/reference#role-select), [mentionable select](https://docs.discord.com/developers/components/reference#mentionable-select), or [channel select](https://docs.discord.com/developers/components/reference#channel-select)
 For modals, prefer [Label](https://docs.discord.com/developers/components/reference#label) instead of Action Row. Action Row with Text Inputs in modals is deprecated.

###### Action Row Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `1` for action row component |
| id? | integer | Optional identifier for component |
| components | array containing the action row's child components | As many as 5 interactive buttons, or one select component |

###### Action Row Child Components

| Available Components | Description |
| --- | --- |
| Button | An Action Row may hold up to 5 Buttons |
| String Select | A single String Select |
| User Select | A single User Select |
| Role Select | A single Role Select |
| Mentionable Select | A single Mentionable Select |
| Channel Select | A single Channel Select |

###### Examples

Message Example

Payload for creating a message with an Action Row component

(Figure: Action Row example containing three buttons)

```
{
  "flags": 32768,
  "components": [
    {
      "type": 1,  // ComponentType.ACTION_ROW
      "components": [
        {
          "type": 2,  // ComponentType.BUTTON
          "custom_id": "click_yes",
          "label": "Accept",
          "style": 1
        },
        {
          "type": 2,  // ComponentType.BUTTON
          "label": "Learn More",
          "style": 5,
          "url": "http://watchanimeattheoffice.com/"
        },
        {
          "type": 2,  // ComponentType.BUTTON
          "custom_id": "click_no",
          "label": "Decline",
          "style": 4
        }
      ]
    }
  ]
}

```

---

