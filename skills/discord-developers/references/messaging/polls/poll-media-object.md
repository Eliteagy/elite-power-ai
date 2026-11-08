# Poll media object
Context: Discord developer reference: Poll media object
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](poll-endpoints.md) / [Previous source section](poll-endpoints-layout-type.md) / [Following source section](poll-answer-object.md)
<a id="source-poll-media-object"></a> <a id="source-poll-media-object-structure"></a>

### Poll Media Object

 The poll media object is shared by questions and answers. It leaves room for additional display formats later. At present, `question` supports only `text`, and answers may include optional `emoji`.

###### Poll Media Object Structure

| Field | Type | Description |
| --- | --- | --- |
| text? | string | The text of the field |
| emoji? | partial emoji | The emoji of the field |

 `text` is expected to be non-null for questions and answers today, but do not rely on that forever. `text` is limited to 300 characters on the question and 55 characters on each answer. When an answer uses an emoji, send only `id` for a custom emoji or only `name` for a default emoji.

