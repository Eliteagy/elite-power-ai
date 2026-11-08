# Moderation metadata fields
Context: Discord developer reference: Moderation metadata fields
[Source](integrate-moderation-index.md) / [Previous source section](applying-moderation-decisions-lobby-messages.md) / [Following source section](handling-moderation-metadata-on-the-client.md)
<a id="source-moderation-metadata-fields"></a>

### Moderation Metadata Fields

 The metadata body is an unrestricted key-value map. Choose keys understood by your client. Common patterns include:
| Key | Example values | Purpose |
| --- | --- | --- |
| `action` | `hide`, `show`, `blur`, `replace` | Rendering instruction for the client. |
| `reason` | `toxicity`, `spam` | Reason for the moderation result, useful for logs. |
| `replacement` | any string | Replacement text to show instead of the original message. |
| `severity` | `low`, `medium`, `high` | Optional severity classification |

 **Limits:** Each message can have up to 5 keys; keys may be no more than 1024 characters; values may be no more than 2000 characters, matching the maximum Discord message length and allowing modified message content. Moderation metadata is scoped to the application, so only your application can read it, even when the message is visible in Discord.

