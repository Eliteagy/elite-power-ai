# Send lobby message parameters
Context: Discord developer reference: Send lobby message parameters
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](send-lobby-message.md) / [Following source section](lobby-message-object.md)
<a id="source-json-params-6"></a>

### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| content | string | message content. Must not be empty. |
| metadata? | ?dict<string, string> | optional string key/value dictionary sent with the message to active clients through the Social SDK. It is not stored on the linked channel message. |
| flags? | integer | optional message flags represented as a combined bitfield. Only Social SDK-creatable flags are accepted. |

