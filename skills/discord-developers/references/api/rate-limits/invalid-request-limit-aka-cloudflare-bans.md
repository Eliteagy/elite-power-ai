# Invalid request limit aka cloudflare bans
Context: Discord developer reference: Invalid request limit aka cloudflare bans
[Source](rate-limits-index.md) / [Previous source section](global-rate-limit.md)
<a id="source-invalid-request-limit-aka-cloudflare-bans"></a>

### Invalid Request Limit aka Cloudflare bans

 Discord automatically applies temporary API restrictions to IP addresses that generate too many invalid HTTP requests. The current threshold is **10,000 per 10 minutes**. Responses with **401**, **403**, or **429** status count as invalid requests. Applications should make practical efforts to avoid them. For example:
- Avoid **401** responses by sending a valid authorization token when one is required, and stop retrying after a token is known to be invalid
- Avoid **403** responses by checking role and channel permissions before attempting requests the caller cannot perform
- Avoid **429** responses by reading the rate-limit headers above and waiting for exhausted buckets to reset before issuing more requests. *429 errors returned with `X-RateLimit-Scope: shared` are not counted against you.*
 Large applications, especially ones that might reach 10,000 requests per 10 minutes, or roughly 16 to 17 requests per second, should log and monitor invalid-request rates so they do not hit this fixed limit. Apps are also expected to handle other invalid statuses reasonably. For example, after a webhook returns **404**, do not keep calling it; repeated attempts can cause a temporary restriction.
