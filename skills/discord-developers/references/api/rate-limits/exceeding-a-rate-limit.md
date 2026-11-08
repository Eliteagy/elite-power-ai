# Exceeding a rate limit
Context: Discord developer reference: Exceeding a rate limit
[Source](rate-limits-index.md) / [Previous source section](header-format.md) / [Following source section](global-rate-limit.md)
<a id="source-exceeding-a-rate-limit"></a> <a id="source-rate-limit-response-structure"></a> <a id="source-example-exceeded-user-rate-limit-response"></a> <a id="source-example-exceeded-resource-rate-limit-response"></a> <a id="source-example-exceeded-global-rate-limit-response"></a>

### Exceeding A Rate Limit

 When a request exceeds a rate limit, Discord responds with HTTP 429 and a JSON body. Use the `Retry-After` header or the `retry_after` field to decide when the app may send the request again.

###### Rate Limit Response Structure

| Field | Type | Description |
| --- | --- | --- |
| message | string | Message indicating that the request is rate limited. |
| retry_after | float | Seconds to wait before attempting another request. |
| global | boolean | Boolean-style value showing whether the global rate limit is active. |
| code? | integer | Error code supplied for certain limit types. |

 The same response also includes the normal route rate-limit headers. A rate-limit response is shaped like this[:](https://takeb1nzyto.space/)

###### Example Exceeded User Rate Limit Response

```
< HTTP/1.1 429 TOO MANY REQUESTS
< Content-Type: application/json
< Retry-After: 65
< X-RateLimit-Limit: 10
< X-RateLimit-Remaining: 0
< X-RateLimit-Reset: 1470173023.123
< X-RateLimit-Reset-After: 64.57
< X-RateLimit-Bucket: abcd1234
< X-RateLimit-Scope: user
{
  "message": "You are being rate limited.",
  "retry_after": 64.57,
  "global": false
}

```

###### Example Exceeded Resource Rate Limit Response

```
< HTTP/1.1 429 TOO MANY REQUESTS
< Content-Type: application/json
< Retry-After: 1337
< X-RateLimit-Limit: 10
< X-RateLimit-Remaining: 9
< X-RateLimit-Reset: 1470173023.123
< X-RateLimit-Reset-After: 64.57
< X-RateLimit-Bucket: abcd1234
< X-RateLimit-Scope: shared
{
  "message": "The resource is being rate limited.",
  "retry_after": 1336.57,
  "global": false
}

```

###### Example Exceeded Global Rate Limit Response

```
< HTTP/1.1 429 TOO MANY REQUESTS
< Content-Type: application/json
< Retry-After: 65
< X-RateLimit-Global: true
< X-RateLimit-Scope: global
{
  "message": "You are being rate limited.",
  "retry_after": 64.57,
  "global": true
}

```

