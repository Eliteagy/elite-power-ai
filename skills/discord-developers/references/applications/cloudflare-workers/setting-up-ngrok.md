# Setting up ngrok
Context: Discord developer reference: Setting up ngrok
[Source](hosting-on-cloudflare-workers-index.md) / [Previous source section](running-the-server.md) / [Following source section](deployment.md)
<a id="source-setting-up-ngrok"></a>

### Setting up ngrok

 A slash command causes Discord to make an HTTP request to a public endpoint. Local development needs a public tunnel, so this tutorial uses [`ngrok`](https://ngrok.com/) to expose the local server.

```
$ npm run ngrok

```

 (Figure: ngrok forwarding address) `ngrok` forwards traffic from a public endpoint to the local machine. Copy the HTTPS URL it provides; it will look similar to `https://8098-24-22-245-250.ngrok.io`. Return to the Discord Developer Dashboard and set the app's `Interactions Endpoint URL` to that value. (Figure: Interactions Endpoint URL) Use this setup for local testing. After deploying to Cloudflare, **update this field to the Cloudflare Worker URL.**

