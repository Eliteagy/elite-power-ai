# HTTP
Context: Discord developer reference: HTTP
[Source](gateway-http-and-api-status-index.md) / [Previous source section](voice.md) / [Following source section](json.md)
<a id="source-http"></a> <a id="source-http-response-codes"></a>

### HTTP

 The API returns semantically valid HTTP response codes that reflect request success or failure. The table lists response codes the API may return.

###### HTTP Response Codes

| Code | Meaning |
| --- | --- |
| 200 (OK) | The request completed successfully. |
| 201 (CREATED) | The entity was created successfully. |
| 204 (NO CONTENT) | The request succeeded and the response has no body. |
| 304 (NOT MODIFIED) | The entity was unchanged, so no action occurred. |
| 400 (BAD REQUEST) | The request format was invalid or could not be understood by the server. |
| 401 (UNAUTHORIZED) | The `Authorization` header is absent or invalid. |
| 403 (FORBIDDEN) | The supplied `Authorization` token lacks access to the resource. |
| 404 (NOT FOUND) | No resource exists at the specified location. |
| 405 (METHOD NOT ALLOWED) | The HTTP method is not valid for the specified location. |
| 429 (TOO MANY REQUESTS) | The request is rate limited; see Rate Limits. |
| 502 (GATEWAY UNAVAILABLE) | No gateway was available to handle the request. Wait briefly, then retry. |
| 5xx (SERVER ERROR) | The server hit an error while processing the request; this should be rare. |

