# Bots overview
[Source](accounts-games-and-commerce-index.md) / [Previous source section](monetization-overview-enabling-monetization.md) / [Following source section](bots-overview.md)

<a id="source-bots-overview"></a>

## Bots Overview

*Already know bots? Jump to the [Bots & Companion Apps docs](https://docs.discord.com/developers/bots/overview) or [Getting Started guide](https://docs.discord.com/developers/quick-start/getting-started).* Bots are the most common Discord app type. They show up in servers as bot users with an `APP` tag and can receive events, answer slash commands, moderate, send messages, and run many other workflows through code that uses the Discord API. A bot can connect to Discord through a persistent [Gateway WebSocket](https://docs.discord.com/developers/events/gateway) for live events, an [HTTP interactions endpoint](https://docs.discord.com/developers/interactions/overview) for slash commands and UI components without a persistent socket, or both. Typical bot uses include moderation, server utilities, games, external-service integrations, and automation. If the only requirement is posting messages into a channel, a [webhook](https://docs.discord.com/developers/platform/webhooks) may be simpler than a full bot. Webhooks can send rich embedded messages, but they cannot listen for events or answer interactions the way bots can.

<a id="source-bots-overview-1"></a>

### Bots Overview

Explains what bots are, how they operate, and when to choose one.
