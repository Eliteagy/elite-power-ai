# Poll answer object
Context: Discord developer reference: Poll answer object
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](poll-endpoints.md) / [Previous source section](poll-media-object.md) / [Following source section](poll-results-object.md)
<a id="source-poll-answer-object"></a> <a id="source-poll-answer-object-structure"></a>

### Poll Answer Object

 `answer_id` is the numeric label for an answer. The current implementation assigns 1 to the first answer and then increments sequentially, but callers should not rely on that ordering. Polls currently allow up to 10 answers.

###### Poll Answer Object Structure

| Field | Type | Description |
| --- | --- | --- |
| answer_id* | integer | The ID of the answer |
| poll_media | Poll Media Object | The data of the answer |

 * Sent only in responses from Discord's API/Gateway.

