# Creating your cloudflare worker
Context: Discord developer reference: Creating your cloudflare worker
[Source](hosting-on-cloudflare-workers-index.md) / [Previous source section](adding-bot-permissions.md) / [Following source section](storing-secrets.md)
<a id="source-creating-your-cloudflare-worker"></a>

### Creating your Cloudflare Worker

 Cloudflare Workers provide a practical hosting option for Discord apps because they include a free tier, a simple development workflow, and managed infrastructure without virtual machines. One limitation is that a Worker cannot access non-ephemeral CDN media; for example, fetching `https://cdn.discordapp.com/attachments/1234/56789/my_image.png` returns a `403` error. Ephemeral CDN media remains accessible from Cloudflare Workers.
- Open the [Cloudflare Dashboard](https://dash.cloudflare.com/)
- Go to the `Workers` tab and create a service with the same name as the Discord bot
- [install the Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler/install-update/) and complete its setup.

