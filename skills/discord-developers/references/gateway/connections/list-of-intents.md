# List of intents
[Source](intents-members-and-sharding-index.md) / [Following source section](gateway-intents.md) / [Following source section](guild-structure-member-integration-voice-and-presence-intents.md)

<a id="source-gateway-part-2"></a> <a id="source-list-of-intents"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

### List of Intents

 The list below shows every intent and the Gateway events tied to it. Events not listed are not associated with an intent and are always sent to the app. The [Gateway events](https://docs.discord.com/developers/events/gateway-events) documentation lists all events, including those without an intent.

* [Thread Members Update](https://docs.discord.com/developers/events/gateway-events#thread-members-update) returns different data depending on the intents in use. ** Events under the `GUILD_PRESENCES` and `GUILD_MEMBERS` intents are **off by default on all API versions**. With **API v6**, you receive those events when authorized and when the intents are enabled in the Developer Portal; you do not need to send intents on API v6 for these events, only enable the flags. With **API v8** or above, intents are required and must be included when identifying. *** `MESSAGE_CONTENT` is not tied to individual events. It controls whether message-content fields are present on events that can include them. See the [message content intent](https://docs.discord.com/developers/events/gateway#message-content-intent) section for details.
