# Content type
Context: Discord developer reference: Content type
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](user-agent.md) / [Following source section](rate-limiting.md)
<a id="source-content-type"></a>

### Content Type

 HTTP API clients must provide a valid `Content-Type` header unless an endpoint states otherwise. Accepted values are `application/json`, `application/x-www-form-urlencoded`, or `multipart/form-data`. Missing or invalid content type can produce error `50035` "Invalid form body".

