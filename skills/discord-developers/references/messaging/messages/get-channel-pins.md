# Get channel pins
Context: Discord developer reference: Get channel pins
[Source](reactions-edits-and-pins-index.md) / [Previous source section](bulk-delete-messages.md) / [Following source section](pin-message.md)
<a id="source-get-channel-pins"></a> <a id="source-query-string-params-1"></a> <a id="source-response-structure"></a> <a id="source-example"></a>

### Get Channel Pins

  Gets pins for a channel. The current user needs `VIEW_CHANNEL`. If that user lacks `READ_MESSAGE_HISTORY` in the channel, the response contains no pins.

###### Query String Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| before? | ISO8601 timestamp | Return messages pinned before this timestamp | absent |
| limit? | integer | Maximum pins to return (1-50) | 50 |

###### Response Structure

| Field | Type |
| --- | --- |
| items | array of message pin objects |
| has_more | boolean |

###### Example

 To retrieve 100 pins, send these two requests: `GET /channels/:id/messages/pins?limit=50` `GET /channels/:id/messages/pins?limit=50&before={pins[pins.len() - 1].pinned_at}`

