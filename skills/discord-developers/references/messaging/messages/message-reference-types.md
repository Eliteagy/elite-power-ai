# Message reference types
Context: Discord developer reference: Message reference types
[Source](message-objects-and-embeds-index.md) / [Owning endpoint, event, object or procedure conditions](message-reference-structure.md) / [Following source section](message-reference-content-attribution.md)
<a id="source-message-reference-types"></a>

#### Message Reference Types

 Defines how the associated data is filled in.
| Type | Value | Coupled Message Field | Description |
| --- | --- | --- | --- |
| DEFAULT | 0 | `referenced_message` | Standard reference used for replies. |
| FORWARD | 1 | `message_snapshot` | Reference that targets a message snapshot at a specific moment. |

 `FORWARD` is limited to basic messages, meaning messages without strong bindings to a non global entity. Discord supports only messages with type `DEFAULT`, `REPLY`, `CHAT_INPUT_COMMAND`, or `CONTEXT_MENU_COMMAND`; messages with a poll, call, or activity are not supported. This may change later. Applications must be able to read a message's content before forwarding it. If an application tries to forward unreadable content, Discord returns `160014` and explains that unreadable message content cannot be forwarded.

