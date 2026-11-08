# Poll results object
Context: Discord developer reference: Poll results object
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](poll-endpoints.md) / [Previous source section](poll-answer-object.md) / [Following source section](poll-endpoints.md)
<a id="source-poll-results-object"></a> <a id="source-poll-results-object-structure"></a> <a id="source-poll-answer-count-object-structure"></a>

### Poll Results Object

 This object contains vote counts per answer. The `results` field can be absent in responses where Discord's backend did not fetch poll results; treat that as unknown results, not zero results. Previously received results can still be used. While a poll is active, counts are usually close but not guaranteed exact because counting at scale has edge cases. After the poll ends, a background job performs the final accurate tally, and that process is complete once `is_finalized` is `true`. Ended polls always include results. If `answer_counts` lacks a row for an answer, that answer has no votes.

###### Poll Results Object Structure

| Field | Type | Description |
| --- | --- | --- |
| is_finalized | boolean | Whether vote counting has been finalized precisely |
| answer_counts | List of Poll Answer Count Object | The counts for each answer |

###### Poll Answer Count Object Structure

| Field | Type | Description |
| --- | --- | --- |
| id | integer | The `answer_id` |
| count | integer | Vote count for this answer |
| me_voted | boolean | Whether the current user selected this answer |

