# User agent
Context: Discord developer reference: User agent
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](consistency.md) / [Following source section](content-type.md)
<a id="source-http-api"></a> <a id="source-user-agent"></a>

### HTTP API

### User Agent

 HTTP API clients must send a valid [User Agent](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.1.5) that identifies the client library and version using this format: **User Agent Example**

```
User-Agent: DiscordBot ($url, $versionNumber)

```

 Clients may add more metadata to the end of that string. Requests without a valid User Agent may be blocked and can return a [Cloudflare error](https://support.cloudflare.com/hc/en-us/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors).

