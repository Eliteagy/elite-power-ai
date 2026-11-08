# Url mapping exceptions
Context: Discord developer reference: Url mapping exceptions
[Source](hosting-mobile-and-proxy-index.md) / [Owning endpoint, event, object or procedure conditions](run-your-application-locally.md) / [Owning endpoint, event, object or procedure conditions](run-your-application-locally-url-mapping.md) / [Previous source section](prefix-target-formatting-rules.md) / [Following source section](run-your-application-locally-logging.md)
<a id="source-exceptions"></a>

#### Exceptions

 The sandbox described above is implemented with a [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). Discord defines several CSP exceptions, so application clients can request those URLs directly without using proxy mappings. Notable exceptions include:
- `https://discord.com/api/`
- `https://canary.discord.com/api/`
- `https://ptb.discord.com/api/`
- `https://cdn.discordapp.com/attachments/`
- `https://cdn.discordapp.com/avatars/`
- `https://cdn.discordapp.com/icons/`
- `https://media.discordapp.net/attachments/`
- `https://media.discordapp.net/avatars/`
- `https://media.discordapp.net/icons/`

---

