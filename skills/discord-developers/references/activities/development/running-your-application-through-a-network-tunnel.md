# Running your application through a network tunnel
Context: Discord developer reference: Running your application through a network tunnel
[Source](hosting-mobile-and-proxy-index.md) / [Owning endpoint, event, object or procedure conditions](run-your-application-locally.md) / [Following source section](running-your-application-in-production.md)
<a id="source-running-your-application-through-a-network-tunnel"></a>

### Running Your Application Through A Network Tunnel

 Local testing works, but Discord recommends testing through the Discord proxy so URL behavior matches production before release. A network tunnel such as [cloudflared](https://github.com/cloudflare/cloudflared#installing-cloudflared) can expose a local server while still going through the proxy. A common setup gives every developer a separate development-only application. To run a local environment through Discord's proxy, complete these steps:
1. In the Discord Developer portal, create a new application.
2. Enable Activities for your app.
3. Configure the application's [URL mapping](https://docs.discord.com/developers/activities/development-guides/local-development#url-mapping).
4. Start the local web server.
5. Install and start a tunneling tool such as [cloudflared](https://github.com/cloudflare/cloudflared#installing-cloudflared), pointing it at the local web server.
 The local web server may use HTTP while the tunnel presents HTTPS. With cloudflared, run the command below and substitute your server's port for `3000`.

```
cloudflared tunnel --url http://localhost:3000

```

 After the command starts, cloudflared prints the public tunnel URL.

```
Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):
https://funky-jogging-bunny.trycloudflare.com

```

 In the Discord Developer Portal, change the Application URL mapping for the `/` url to `funky-jogging-bunny.trycloudflare.com`, matching the tunnel address, then save. (Figure: Configuring your URL Mapping) A domain you do not control, such as one from ngrok's free tier, can later be claimed by someone else and used to serve a harmful replacement site. Treat that as a risk, and when you must use a third-party temporary domain, clear or reset the URL mapping after the tunnel session. Then follow [Launching your Application from the Discord Client](https://docs.discord.com/developers/activities/development-guides/local-development#launch-your-application-from-the-discord-client). Leave Application URL Override disabled.

