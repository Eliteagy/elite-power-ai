# Set up a public endpoint
Context: Discord developer reference: Set up a public endpoint
[Source](project-and-authentication-index.md) / [Previous source section](run-your-app.md) / [Following source section](set-up-your-activity-url-mapping.md)
<a id="source-set-up-a-public-endpoint"></a>

### Set up a public endpoint

 Next, create the public endpoint that serves the Activity frontend. Use a reverse-proxy tunnel. This guide uses [`cloudflared`](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/), but [ngrok](https://ngrok.com/docs) or another reverse proxy can be used instead. While the app is still running, open another terminal and start a tunnel to the previous port, `5173` in this example:

```
cloudflared tunnel --url http://localhost:5173

```

 Running `cloudflared` generates a public URL and prints output similar to this:

```
Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):
https://funky-jogging-bunny.trycloudflare.com

```

 Copy the URL from that output; it must be added to the app settings.

