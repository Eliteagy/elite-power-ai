# Reaction object reaction structure
Context: Discord developer reference: Reaction object reaction structure
[Source](message-objects-and-embeds-index.md) / [Previous source section](message-snapshot-structure.md) / [Following source section](reaction-count-details-object.md)
<a id="source-reaction-object"></a> <a id="source-reaction-structure"></a>

### Reaction Object

###### Reaction Structure

| Field | Type | Description |
| --- | --- | --- |
| count | integer | total uses of this emoji as a reaction, including super reacts |
| count_details | object | Reaction count details object |
| me | boolean | whether the current user reacted with this emoji |
| me_burst | boolean | whether the current user used a super reaction with this emoji |
| emoji | partial emoji object | emoji information |
| burst_colors | array | HEX colors used by the super reaction |

