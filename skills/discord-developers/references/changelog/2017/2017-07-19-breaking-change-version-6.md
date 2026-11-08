# Breaking Change: Version 6

Date: 2017-07-19
Categories: Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L4528) · [Year index](INDEX.md)

<a id="source-breaking-change-version-6"></a>


- [Channel](https://docs.discord.com/developers/resources/channel#channel-object) Object
  - `is_private` removed
  - [`type`](https://docs.discord.com/developers/resources/channel#channel-object-channel-types) now uses an integer
  - `recipient` changed to `recipients`, an array of [user](https://docs.discord.com/developers/resources/user#user-object) objects

- [Message](https://docs.discord.com/developers/resources/message#message-object) Object
  - [`type`](https://docs.discord.com/developers/resources/message#message-object-message-types) added to support system messages

- [Status Update](https://docs.discord.com/developers/events/gateway-events#update-presence-gateway-presence-update-structure) Object
  - `idle_since` renamed to `since`

⌘I
