# Installation context user context
Context: Discord developer reference: Installation context user context
[Source](application-objects-and-endpoints-index.md) / [Owning endpoint, event, object or procedure conditions](application-object.md) / [Owning endpoint, event, object or procedure conditions](application-object-installation-context.md) / [Previous source section](installation-context-server-context.md) / [Following source section](setting-supported-installation-contexts.md)
<a id="source-user-context"></a>

#### User Context

 Apps installed in a user context, or user-installed apps, are visible *only* to the authorizing user and do not need server-specific permissions. A user-installed app can appear across that user's servers, DMs, and GDMs, but it must respect the user's permissions in the current surface. For example, if a user runs a command for a user-installed app in a server channel where the user cannot send messages, the app cannot [respond to an interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type) with a non-ephemeral message. The [interaction context](https://docs.discord.com/developers/interactions/application-commands#interaction-contexts) documentation explains how installation context affects interactions.

