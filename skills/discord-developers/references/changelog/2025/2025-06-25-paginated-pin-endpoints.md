# Paginated Pin Endpoints

Date: 2025-06-25
Categories: HTTP API
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2031) · [Year index](INDEX.md)

<a id="source-paginated-pin-endpoints"></a>


New endpoints are available for managing paginated pins in channels. Get Channel Pins retrieves pinned messages with pagination support, which is more efficient for channels with many pinned messages. Pin and Unpin keep their behavior but use a new route. The older pinned-message endpoints are deprecated. The new endpoints should be straightforward to adopt because they keep similar functionality while adding pagination.

<a id="source-new-endpoints"></a>

#### New Endpoints

**[Get Channel Pins](https://docs.discord.com/developers/resources/message#get-channel-pins)**: Retrieve paginated pinned messages in a channel: **[Pin Message](https://docs.discord.com/developers/resources/message#pin-message)**: Pin a message in a channel: **[Unpin Message](https://docs.discord.com/developers/resources/message#unpin-message)**: Unpin a message in a channel:

<a id="source-deprecated-endpoints"></a>

#### Deprecated Endpoints

**[Get Pinned Messages](https://docs.discord.com/developers/resources/message#get-pinned-messages-deprecated)**: **[Pin Message](https://docs.discord.com/developers/resources/message#pin-message-deprecated)**: **[Unpin Message](https://docs.discord.com/developers/resources/message#unpin-message-deprecated)**:
