# Legal disclosure message type
Context: Discord developer reference: Legal disclosure message type
[Source](sending-direct-messages-index.md) / [Previous source section](suppressing-double-notifications.md) / [Following source section](message-history.md)
<a id="source-legal-disclosure-message-type"></a>

### Legal Disclosure Message Type

 For developer convenience, when a user sends their first in-game message, Discord shows a generated disclosure message in the Discord client. The SDK injects this "fake" chat entry with a simple English explanation for the user. Detect it with [`MessageHandle::DisclosureType`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#abefb9be7836951a6acf78a4bb1676638). You can render it differently, replace the wording, localize it, style it to look more official, or omit it from your UI.

