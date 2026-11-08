# Authorization account and resource state codes
Context: Discord JSON error-code reference; preserve code meanings and linked response interpretation.
[Source](gateway-http-and-api-status-index.md) / [Response code/message/errors interpretation](json.md) / [Previous source section](resource-maximum-and-capacity-codes.md) / [Following source section](access-payload-permission-and-validation-codes.md)

| Code | Meaning |
| --- | --- |
| 40001 | Unauthorized. Send a valid token and retry. |
| 40002 | Account verification is required before this action can be performed. |
| 40003 | Direct messages are being opened too quickly. |
| 40004 | Send messages has been temporarily disabled |
| 40005 | The request entity is too large. Send smaller content. |
| 40006 | This feature is temporarily disabled server-side. |
| 40007 | The user is banned from this guild. |
| 40012 | Connection has been revoked |
| 40018 | Only consumable SKUs can be consumed. |
| 40019 | Sandbox entitlements are the only entitlements that can be deleted. |
| 40032 | The target user is not connected to voice. |
| 40033 | This message has already been crossposted. |
| 40041 | An application command already uses that name. |
| 40043 | Application interaction failed to send |
| 40058 | Messages cannot be sent in a forum channel. |
| 40060 | Interaction has already been acknowledged |
| 40061 | Tag names must be unique |
| 40062 | The service resource is being rate limited. |
| 40066 | No tags are available for non-moderators to set. |
| 40067 | Creating a forum post in this channel requires a tag. |
| 40074 | This resource already has an entitlement grant. |
| 40094 | This interaction has reached the follow-up message limit. |
| 40333 | Cloudflare blocked the request. Setting a proper User Agent often resolves it. |
