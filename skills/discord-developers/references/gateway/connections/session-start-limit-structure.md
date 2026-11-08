# Session start limit structure
Context: Discord developer reference: Session start limit structure
[Source](gateway-endpoints-and-session-limits-index.md) / [Previous source section](get-gateway-bot.md)
<a id="source-session-start-limit-object"></a> <a id="source-session-start-limit-structure"></a>

### Session Start Limit Object

###### Session Start Limit Structure

| Field | Type | Description |
| --- | --- | --- |
| total | integer | Total session starts permitted for the current user |
| remaining | integer | Session starts still available to the current user |
| reset_after | integer | Milliseconds until the limit resets |
| max_concurrency | integer | Identify requests permitted per 5 seconds |
