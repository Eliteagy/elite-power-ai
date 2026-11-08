# Message snapshot structure
Context: Discord developer reference: Message snapshot structure
[Source](message-objects-and-embeds-index.md) / [Previous source section](message-reference-object-voice-messages.md) / [Following source section](reaction-object-reaction-structure.md)
<a id="source-message-snapshot-object"></a> <a id="source-message-snapshot-structure"></a>

### Message Snapshot Object

#### Message Snapshot Structure

| Field | Type | Description |
| --- | --- | --- |
| message* | partial message object | minimal field subset from the forwarded message |

 * The current message-field subset is: `type`, `content`, `embeds`, `attachments`, `timestamp`, `edited_timestamp`, `flags`, `mentions`, `mention_roles`, `stickers`, `sticker_items`, and `components`. Message snapshots can support nested snapshots, but the current nesting depth limit is 1.

