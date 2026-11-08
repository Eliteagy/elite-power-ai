# What are privileged intents
[Source](privileged-intent-policy-index.md) / [Previous source section](overview.md) / [Following source section](what-are-privileged-intents.md)

<a id="source-what-are-privileged-intents"></a>

## What are Privileged Intents?

If you received a notice about [Privileged Intents](https://docs.discord.com/developers/events/gateway#privileged-intents), this guide explains the situation. Your app may have grown to the review point, may need to renew access that was previously approved, or may have lost behavior that depended on gated data. Use this page to understand the change, its impact on your app, and the next action to take.

---

<a id="source-what-are-privileged-intents-1"></a>

### What are Privileged Intents?

 Discord restricts some Gateway data through [Privileged Intents](https://docs.discord.com/developers/events/gateway#privileged-intents). The current privileged intents are:
- **Guild Presences**: user status such as online or offline, activity details, and platform information
- **Guild Members**: events for member joins, removals, and updates, plus support for listing every member in a server
- **Message Content**: message object fields named `content`, `embeds`, `attachments`, `components`, and `poll`
 Because these intents expose sensitive categories of data, they start turned off and should be requested only when the app requires them. Without an enabled intent, the app simply does not receive the data controlled by that intent.

---
