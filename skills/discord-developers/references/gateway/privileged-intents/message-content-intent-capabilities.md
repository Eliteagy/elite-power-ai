# Message content intent capabilities
Context: Discord developer reference: Message content intent capabilities
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](who-does-this-apply-to.md) / [Previous source section](guild-presences-intent-decision.md) / [Following source section](message-content-intent-exceptions.md)
<a id="source-message-content-intent"></a> <a id="source-what-you-get-with-the-intent-2"></a>

### Message Content Intent

### What you get with the intent

 The Message Content intent governs several fields in message objects across Gateway events and REST API responses:
- `content`: The message's text body
- `embeds`: Embedded content
- `attachments`: Files attached to the message
- `components`: User-sent message components such as buttons and selects
- `poll`: Poll data
 Without this intent, those fields are delivered as empty strings or empty arrays, except for several important cases.

