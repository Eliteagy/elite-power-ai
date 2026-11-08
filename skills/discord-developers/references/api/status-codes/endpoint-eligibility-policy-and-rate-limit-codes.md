# Endpoint eligibility policy and rate limit codes
Context: Discord JSON error-code reference; preserve code meanings and linked response interpretation.
[Source](gateway-http-and-api-status-index.md) / [Response code/message/errors interpretation](json.md) / [Previous source section](generic-failure-and-unknown-resource-codes.md) / [Following source section](resource-maximum-and-capacity-codes.md)

| Code | Meaning |
| --- | --- |
| 20001 | Bots cannot use this endpoint |
| 20002 | This endpoint is available to bots only. |
| 20009 | Explicit content cannot be delivered to the requested recipient(s). |
| 20012 | The caller is not authorized to take this action on the application. |
| 20015 | A premium subscription is required for this action. |
| 20016 | Slowmode rate limiting prevents this action. |
| 20018 | Only this account's owner may perform this action. |
| 20022 | Announcement rate limits prevent editing this message. |
| 20024 | Under minimum age |
| 20028 | The channel write rate limit has been hit for this write action. |
| 20029 | The server write rate limit has been hit for this write action. |
| 20031 | The Stage topic, server name, server description, or channel names include disallowed words. |
| 20035 | Guild premium subscription level too low |
