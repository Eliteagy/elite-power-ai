# Run your application locally url mapping
Context: Discord developer reference: Run your application locally url mapping
[Source](hosting-mobile-and-proxy-index.md) / [Owning endpoint, event, object or procedure conditions](run-your-application-locally.md) / [Previous source section](launch-your-application-from-the-discord-client-mobile.md) / [Following source section](how-to-set-a-url-mapping.md)
<a id="source-url-mapping"></a>

### URL Mapping

 Discord sandboxes Activities through a Discord proxy. The proxy helps conceal user IP addresses and application IP addresses, and it blocks URLs that are known to be malicious. Application owners can allow proxy access to outside endpoints by defining mappings. Because the application is sandboxed, direct requests to external URLs are blocked. For example, to reach `https://some-api.com`. from the application, create a URL mapping with `PREFIX` set to `/api` and `TARGET` set to `some-api.com`. Requests made to `/api` inside the application are then forwarded through Discord's proxy to `some-api.com`.

