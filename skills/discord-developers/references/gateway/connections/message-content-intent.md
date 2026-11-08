# Message content intent
Context: Discord developer reference: Message content intent
[Source](intents-members-and-sharding-index.md) / [Owning endpoint, event, object or procedure conditions](privileged-intents.md) / [Previous source section](privileged-intents-http-restrictions.md) / [Following source section](rate-limiting.md)
<a id="source-message-content-intent"></a>

#### Message Content Intent

 `MESSAGE_CONTENT (1 << 15)` is a special privileged intent that is not directly mapped to Gateway events. Instead, `MESSAGE_CONTENT` permits the app to receive message-content data across APIs. Documentation notes any fields affected by the message content intent. For example, the `content`, `embeds`, `attachments`, `components`, and `poll` fields in [message objects](https://docs.discord.com/developers/resources/message#message-object) all contain message content and need the intent. Like other privileged intents, `MESSAGE_CONTENT` requires approval. After verification, apply for the intent from the app settings in the Developer Portal. The [Help Center](https://support-dev.discord.com/hc/en-us/articles/5324827539479) explains the review policy. Apps **without** the intent receive empty values for fields containing user-entered content except for:
- Content in messages sent by the app
- Content in DMs with the app
- Content where the app is [mentioned](https://docs.discord.com/developers/reference#message-formatting-formats)
- Content of the message targeted by a [message context menu command](https://docs.discord.com/developers/interactions/application-commands#message-commands)

