# Running your application in production
Context: Discord developer reference: Running your application in production
[Source](hosting-mobile-and-proxy-index.md) / [Owning endpoint, event, object or procedure conditions](run-your-application-locally.md) / [Previous source section](running-your-application-through-a-network-tunnel.md) / [Following source section](launch-your-application-from-the-discord-client.md)
<a id="source-running-your-application-in-production"></a>

### Running Your Application In Production

 Production setup follows nearly the same sequence:
1. Create a new application if one does not already exist.
2. Enable Activities for your app.
3. Configure the application's [URL Mapping](https://docs.discord.com/developers/activities/development-guides/local-development#url-mapping). Set the URL for the application's html at the `/` route.
4. Use [Launching your Application from the Discord Client](https://docs.discord.com/developers/activities/development-guides/local-development#launch-your-application-from-the-discord-client). Keep Application URL Override turned off.
 The application is now using the configuration intended for the fully published version. (Figure: application-test-mode-prod)

---

