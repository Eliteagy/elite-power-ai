# Inline Replies

Date: 2020-11-16
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L4114) · [Year index](INDEX.md)

<a id="source-inline-replies"></a>




Inline Replies are now covered in the docs. Their behavior is not the same in v6 and v8, so implement them carefully:
- Inline replies use type `19` in v8, while v6 still represents them as type `0`
- Message creation can now include `message_reference` to create a reply
- The [Message Object](https://docs.discord.com/developers/resources/message#message-object) now has a `referenced_message` field
- The [Allowed Mentions Object](https://docs.discord.com/developers/resources/message#allowed-mentions-object) now has a `replied_user` field
- [Message Create](https://docs.discord.com/developers/events/gateway-events#message-create) gateway event includes `referenced_message` when the created message is a reply; outside replies, that field is not guaranteed.
