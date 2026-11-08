# Poll endpoints poll object
Context: Discord developer reference: Poll endpoints poll object
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](poll-endpoints.md) / [Following source section](poll-create-request-object.md)
<a id="source-poll-object"></a> <a id="source-poll-object-structure"></a>

### Poll Object

 The poll object contains several nested layers. It is structured for future extension, so some fields are more elaborate than the current feature set requires.

###### Poll Object Structure

| Field | Type | Description |
| --- | --- | --- |
| question | Poll Media Object | The poll question. Only `text` is supported. |
| answers | List of Poll Answer Objects | The list of answer options for the poll. |
| expiry | ?IS08601 timestamp | Timestamp when the poll closes. |
| allow_multiselect | boolean | Whether users may choose more than one answer |
| layout_type | integer | The poll layout type |
| results? | Poll Results Object | The results of the poll |

 `expiry` is nullable so non-expiring polls can be supported later, although every poll currently has an expiry.

