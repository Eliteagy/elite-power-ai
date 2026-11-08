# Understanding rich presence data
Context: Discord developer reference: Understanding rich presence data
[Source](developers-index.md) / [Following source section](default-rich-presence-data.md)
<a id="source-rich-presence-social-commerce"></a> <a id="source-overview"></a> <a id="source-understanding-rich-presence-data"></a>

# Rich Presence, Social Commerce

> Discord Developers reference. Original prose; identifiers preserved verbatim.

## Overview

Covers: Understanding Rich Presence Data; Discord Game Shops.

## Understanding Rich Presence Data

For an [Activity](https://docs.discord.com/developers/activities/overview), the [Embedded App SDK](https://docs.discord.com/developers/developer-tools/embedded-app-sdk) simplifies adding Rich Presence so Discord can show what a user is doing inside a game or social experience. Treat Rich Presence data as an extension of the Activity: a modest amount of extra context can make it more useful to the current user and to friends who may want to join. This guide covers the platform concepts and technical details needed to add Rich Presence to an existing Activity. If you are unsure whether the Embedded App SDK is the right integration path, read [Choosing an SDK](https://docs.discord.com/developers/rich-presence/overview#choosing-an-sdk). The remaining guidance assumes you already have an [app](https://docs.discord.com/developers/quick-start/overview-of-apps) capable of launching an Activity. If not, complete [building your first Activity](https://docs.discord.com/developers/activities/building-an-activity) first.

