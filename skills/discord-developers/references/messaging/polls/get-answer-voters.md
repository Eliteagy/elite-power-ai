# Get answer voters
Context: Discord developer reference: Get answer voters
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](poll-endpoints.md) / [Previous source section](poll-endpoints.md) / [Following source section](poll-endpoints-end-poll.md)
<a id="source-get-answer-voters"></a> <a id="source-query-string-params"></a> <a id="source-response-body"></a>

### Get Answer Voters

  Return the users who voted for a particular answer.

###### Query String Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| after? | snowflake | Return users after this user ID | absent |
| limit? | integer | Maximum users to return (1-100) | 25 |

###### Response Body

| Field | Type | Description |
| --- | --- | --- |
| users | array of user | Users that voted for this answer |

