# Cache busting
Context: Discord developer reference: Cache busting
[Source](participants-avatars-and-lifecycle-index.md) / [Previous source section](security-considerations-using-cookies.md) / [Following source section](handling-rate-limits.md)
<a id="source-cache-busting"></a> <a id="source-cache-busting-1"></a>

## Cache Busting

### Cache Busting

 Application assets follow [cache headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control). The exception is Discord's application proxy, which strips cache headers from assets whose `content-type` includes `text/html`. For non-`text/html` content, use cache busting. Build tooling often provides this; if JavaScript or CSS uses static filenames, add cache-busting behavior, such as [webpack enables creating dynamic file names](https://webpack.js.org/guides/caching/).

---

