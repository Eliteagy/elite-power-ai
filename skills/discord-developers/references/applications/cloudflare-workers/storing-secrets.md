# Storing secrets
Context: Discord developer reference: Storing secrets
[Source](hosting-on-cloudflare-workers-index.md) / [Previous source section](creating-your-cloudflare-worker.md) / [Following source section](running-locally.md)
<a id="source-storing-secrets"></a>

### Storing secrets

 The production service needs the values saved earlier. Set those variables with:

```
$ wrangler secret put DISCORD_TOKEN
$ wrangler secret put DISCORD_PUBLIC_KEY
$ wrangler secret put DISCORD_APPLICATION_ID

```

 You also need the Guild ID for the server where the app is installed. Find it in the URL for any channel in that server. In `https://discord.com/channels/123456/789101112`, the Guild ID is the first number, **`123456`**. After identifying the Guild ID, set that variable too:

```
$ wrangler secret put DISCORD_TEST_GUILD_ID

```

