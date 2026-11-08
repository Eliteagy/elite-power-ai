# Webhook events
Context: Discord developer reference: Webhook events
[Source](integrate-moderation-index.md) / [Previous source section](how-it-works.md) / [Following source section](applying-moderation-decisions.md)
<a id="source-webhook-events"></a>

### Webhook Events

 First, [subscribe to the following events](https://docs.discord.com/developers/events/webhook-events#subscribing-to-events) on the application's webhook so messages arrive for moderation:
| Event | Description |
| --- | --- |
| `GAME_DIRECT_MESSAGE_CREATE` | Emitted when a DM is created during a Social SDK session. |
| `GAME_DIRECT_MESSAGE_UPDATE` | Emitted when a DM changes because its content was edited. |
| `LOBBY_MESSAGE_CREATE` | Emitted when a lobby receives a new message. |
| `LOBBY_MESSAGE_UPDATE` | Emitted when an existing lobby message is edited. |

 Use the [Webhook Events reference](https://docs.discord.com/developers/events/webhook-events) for complete event schemas. Metadata-only changes do **not** emit webhook events; active game sessions receive them only through realtime SDK callbacks.

