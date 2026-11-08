# Using the embedded app SDK
Context: Discord developer reference: Using the embedded app SDK
[Source](event-delivery-index.md) / [Previous source section](using-webhooks.md) / [Following source section](gateway-events.md)
<a id="source-using-the-embedded-app-sdk"></a>

### Using the Embedded App SDK

 For [Activities](https://docs.discord.com/developers/activities/overview), the Embedded App SDK can emit [SDK events](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#sdk-events), including changes to a user's voice state or screen orientation. Subscribe by calling [`subscribe()`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#subscribe) with the SDK event name. The [Embedded App SDK documentation](https://docs.discord.com/developers/developer-tools/embedded-app-sdk) covers the event-listening model for this SDK.

