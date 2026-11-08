# Message Forwarding Requires Message Content Access

Date: 2026-04-14
Categories: HTTP API
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L762) · [Year index](INDEX.md)

<a id="source-message-forwarding-requires-message-content-access"></a>


Starting today, applications must be able to read a message's content before forwarding it. When an app attempts to forward unreadable content, Discord now returns `160014` and explains that the content cannot be forwarded. Most applications are unaffected; recently affected developers were notified directly by system DM.
