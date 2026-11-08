# Hosting on cloudflare workers
Context: Discord developer reference: Hosting on cloudflare workers
[Source](hosting-on-cloudflare-workers-index.md) / [Following source section](features-and-technologies-used.md)
<a id="source-hosting-on-cloudflare-workers"></a>

# Hosting On Cloudflare Workers

> Discord Developers reference. Original prose; identifiers preserved verbatim.

Discord apps can receive client interaction events as [webhooks](https://docs.discord.com/developers/resources/webhook), including events from [application commands](https://docs.discord.com/developers/interactions/application-commands) and [message components](https://docs.discord.com/developers/components/reference). Discord sends each event as a JSON payload to the configured HTTPS endpoint, called the Interactions Endpoint URL in the app settings. This tutorial builds a JavaScript Discord app based on [`r/aww`](https://www.reddit.com/r/aww). The complete app code is available **[on GitHub](https://github.com/discord/cloudflare-sample-app)**.

