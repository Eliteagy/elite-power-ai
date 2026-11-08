# Search guild messages
Context: Discord developer reference: Search guild messages
[Source](attachments-and-message-creation-index.md) / [Previous source section](get-channel-messages.md) / [Following source section](search-sort-modes.md)
<a id="source-search-guild-messages"></a> <a id="source-query-string-params-1"></a> <a id="source-author-types"></a> <a id="source-search-has-types"></a> <a id="source-search-embed-types"></a>

### Search Guild Messages

  Returns guild messages matching a search query, without the `reactions` key. Requires `READ_MESSAGE_HISTORY`. Availability is limited by whether the application's `MESSAGE_CONTENT` [Privileged Intent](https://docs.discord.com/developers/events/gateway#privileged-intents) is enabled. If the searched entity is not indexed yet, the endpoint returns a 202 accepted response with no search results, using a body similar to an error response:

```
{
  "message": "Index not yet available. Try again later",
  "code": 110000,
  "documents_indexed": 0,
  "retry_after": 2
}

```

Retry after the duration in `retry_after`. If `retry_after` is `0`, wait a short time before retrying. Search optimizations can return slightly fewer messages than the requested limit for messages that have not been accessed recently, so do not use the `messages` array length for pagination. When messages are being created or deleted, `total_results` may be inaccurate.

###### Query String Params

| Field | Type | Description |
| --- | --- | --- |
| limit? | integer | maximum messages to return (1-25, default 25) |
| offset? | integer | offset for returned messages (max 9975) |
| max_id? | snowflake | message ID to search before |
| min_id? | snowflake | message ID to search after |
| slop? | integer | maximum skipped words between matching tokens in search `content` (max 100, default 2) |
| content? | string | content filter for messages (max 1024 characters) |
| channel_id? | array of snowflakes | channel filter for messages (max 500) |
| author_type? | array of strings | Filter messages by author type |
| author_id? | array of snowflakes | author filter for messages (max 100) |
| mentions? | array of snowflakes | filter for messages mentioning these users (max 100) |
| mentions_role_id? | array of snowflakes | filter for messages mentioning these roles (max 100) |
| mention_everyone? | boolean | filter by whether messages mention @everyone |
| replied_to_user_id? | array of snowflakes | filter for messages replying to these users (max 100) |
| replied_to_message_id? | array of snowflakes | filter for messages replying to these messages (max 100) |
| pinned? | boolean | filter by pinned or unpinned messages |
| has? | array of strings | filter by whether messages contain selected content types |
| embed_type? | array of strings | Filter messages by embed type |
| embed_provider? | array of strings | embed provider filter, case-sensitive, e.g. `Tenor` (max 256 characters, max 100) |
| link_hostname? | array of strings | link hostname filter, e.g. `discordapp.com` (max 256 characters, max 100) |
| attachment_filename? | array of strings | attachment filename filter (max 1024 characters, max 100) |
| attachment_extension? | array of strings | attachment extension filter, e.g. `txt` (max 256 characters, max 100) |
| sort_by? [1] | string | The sorting algorithm to use |
| sort_order? [1] | string | sort direction (`asc` or `desc`, default `desc`) |
| include_nsfw? | boolean | whether age-restricted channel results are included (default false) |

 [1] Relevance sorting does not honor sort order.

###### Author Types

 Prefix any type with `-` to negate it, excluding messages that match that type.
| Type | Description |
| --- | --- |
| user | Return messages from user accounts |
| bot | Return messages from bot accounts |
| webhook | Return messages sent by webhooks |

###### Search Has Types

 Prefix any type with `-` to negate it, excluding messages that match that type.
| Type | Description |
| --- | --- |
| image | Return messages containing an image |
| sound | Return messages containing a sound attachment |
| video | Return messages containing a video |
| file | Return messages containing an attachment |
| sticker | Return messages containing a sent sticker |
| embed | Return messages containing an embed |
| link | Return messages containing a link |
| poll | Return messages containing a poll |
| snapshot | Return messages containing a forwarded message |

###### Search Embed Types

 These values are broader than actual [embed types](https://docs.discord.com/developers/resources/message#embed-object-embed-types) and do not map 1:1 to them.
| Type | Description |
| --- | --- |
| image | Return messages containing an image embed |
| video | Return messages containing a video embed |
| gif [1] | Return messages containing a gifv embed |
| sound | Return messages containing a sound embed |
| article | Return messages containing an article embed |

 [1] Messages sent before February 24, 2026 may not be indexed correctly under the `gif` embed type.

