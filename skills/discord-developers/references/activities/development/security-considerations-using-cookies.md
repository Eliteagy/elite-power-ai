# Security considerations using cookies
Context: Discord developer reference: Security considerations using cookies
[Source](participants-avatars-and-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](activity-proxy-considerations.md) / [Owning endpoint, event, object or procedure conditions](trusting-client-data.md) / [Following source section](cache-busting.md)
<a id="source-using-cookies"></a>

#### Using Cookies

 For cookies sent through the proxy, set the cookie domain to your app's full `{clientId}.discordsays.com` domain. Also set `SameSite=None Partitioned`. `SameSite=None` is required because browsers otherwise reject or withhold cookies with stricter settings during iframe navigation. `Partitioned` restricts the cookie to Discord iframes. Other activities cannot use your activity's cookie because the Content Security Policy (CSP) limits requests to your app's own proxy.

