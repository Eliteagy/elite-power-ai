# Header format
Context: Discord developer reference: Header format
[Source](rate-limits-index.md) / [Previous source section](rate-limits.md) / [Following source section](exceeding-a-rate-limit.md)
<a id="source-header-format"></a> <a id="source-rate-limit-header-examples"></a>

### Header Format

 Most API responses may include optional HTTP headers that describe the rate limit involved in that request.

###### Rate Limit Header Examples

```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1470173023
X-RateLimit-Reset-After: 1
X-RateLimit-Bucket: abcd1234

```

- **X-RateLimit-Limit** - Total requests allowed for the bucket
- **X-RateLimit-Remaining** - Requests still available before the bucket is exhausted
- **X-RateLimit-Reset** - Epoch timestamp, in seconds since 00:00:00 UTC on January 1, 1970, when the limit resets
- **X-RateLimit-Reset-After** - Seconds until the current rate-limit bucket resets; decimal values may appear to preserve millisecond precision from earlier rate-limit behavior
- **X-RateLimit-Bucket** - Stable bucket identifier for the encountered rate limit, excluding top-level resources in the path
- **X-RateLimit-Global** - Present only on HTTP 429 responses when the global limit, rather than a route limit, was hit
- **X-RateLimit-Scope** - Present only on HTTP 429 responses. Possible values are `user` for a per-bot or per-user limit, `global` for a bot or user global limit, and `shared` for a per-resource limit

