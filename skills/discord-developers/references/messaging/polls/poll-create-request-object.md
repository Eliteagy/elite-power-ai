# Poll create request object
Context: Discord developer reference: Poll create request object
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](poll-endpoints.md) / [Previous source section](poll-endpoints-poll-object.md) / [Following source section](poll-endpoints-layout-type.md)
<a id="source-poll-create-request-object"></a> <a id="source-poll-create-request-object-structure"></a>

### Poll Create Request Object

 This request object is used to create polls across endpoints. It resembles the main [poll object](https://docs.discord.com/developers/resources/poll#poll-object-poll-object-structure), but it is not identical. The key difference is `duration`, which later becomes `expiry`.

###### Poll Create Request Object Structure

| Field | Type | Description |
| --- | --- | --- |
| question | Poll Media Object | The poll question. Only `text` is supported. |
| answers | List of Poll Answer Objects | Available poll answers, with a maximum of 10 |
| duration? | integer | How many hours the poll remains open, capped at 32 days. Defaults to 24 |
| allow_multiselect? | boolean | Whether users may select multiple answers. Defaults to false |
| layout_type? | integer | The poll layout type. Defaults to DEFAULT. |

