# Webhook events
Context: Discord developer reference: Webhook events
[Source](webhook-events-index.md) / [Following source section](subscribing-to-events.md)
<a id="source-webhook-events"></a>

# Webhook Events

> Discord Developers reference. Original prose; identifiers preserved verbatim.

Webhook events are one-way HTTP notifications sent to your app after something happens in Discord. They differ from events [sent over Gateway connections](https://docs.discord.com/developers/events/gateway) because webhook delivery is not realtime and ordering is not guaranteed. [Incoming webhooks](https://docs.discord.com/developers/resources/webhook) are initiated by outside services, while webhook events, or outgoing webhooks, come from Discord activity. Your app therefore needs a public HTTP URL for receiving events, described under [preparing for events](https://docs.discord.com/developers/events/webhook-events#preparing-for-events).

