# JSON
Context: Discord developer reference: JSON
[Source](gateway-http-and-api-status-index.md) / [Previous source section](http.md) / [Following source section](generic-failure-and-unknown-resource-codes.md)
<a id="source-json"></a>

### JSON

 Besides the HTTP status, the API can return a more specific error in the JSON response's `code` key. The response includes a human-readable `message` key. Some errors include extra detail through an `errors` object using [Error Messages](https://docs.discord.com/developers/reference#error-messages).

