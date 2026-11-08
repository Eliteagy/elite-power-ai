# Applying moderation decisions
Context: Discord developer reference: Applying moderation decisions
[Source](integrate-moderation-index.md) / [Previous source section](webhook-events.md) / [Following source section](applying-moderation-decisions-dm-messages.md)
<a id="source-applying-moderation-decisions"></a>

### Applying Moderation Decisions

 After the moderation backend receives and evaluates a message, write the decision to `moderation_metadata` on that message so the game client knows how to display the content.

