# Message Forwarding rollout

Date: 2024-07-15
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2801) · [Year index](INDEX.md)

<a id="source-message-forwarding-rollout"></a> <a id="source-api-updates-since-preview"></a>


Message forwarding is rolling out gradually. When callers create a message with `message_reference.type = FORWARD`, the API can attach a `message_snapshot` to that new message. The feature has [some limitations](https://docs.discord.com/developers/resources/message#message-reference-types); the snapshot is a compact version of a standard `MessageObject` that still preserves the key message content. The resulting message looks like:

```
{
  "id": "1255957733279273083",
  "message_reference": {
    "type": 1, // Forward
    ...
  },
  "message_snapshots": [
    {
      "message": {
        "content": "original message",
        "embeds": [...],
        "attachments": [...],
        ...
      }
    }
  ],
  ...
}

```

Stricter rate limits were applied to this feature based on:
- number of forwards sent by the user
- total attachment size

###### API Updates since preview

This was [previously announced](https://discord.com/channels/613425648685547541/697138785317814292/1233463756160503859) but the final API differs from the first preview in several ways:
- [`message snapshot`](https://docs.discord.com/developers/resources/message#message-snapshot-object) objects no longer include a `guild` field because `message_reference` already carries that information
- forwarded messages now use the distinct `message_reference` type `FORWARD`
