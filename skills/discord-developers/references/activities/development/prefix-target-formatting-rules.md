# Prefix target formatting rules
Context: Discord developer reference: Prefix target formatting rules
[Source](hosting-mobile-and-proxy-index.md) / [Owning endpoint, event, object or procedure conditions](run-your-application-locally.md) / [Owning endpoint, event, object or procedure conditions](run-your-application-locally-url-mapping.md) / [Previous source section](how-to-set-a-url-mapping.md) / [Following source section](url-mapping-exceptions.md)
<a id="source-prefixtarget-formatting-rules"></a>

#### Prefix/Target formatting rules

- URL mappings support protocols such as https, wss, ftp, and others, so the URL target must omit the protocol. For a URL target, use `your-url.com` instead of `https://your-url.com`, and omit `https://` .
- Parameter matching can help route external domain URLs. For an external URL set with multiple subdomains, such as `foo.google.com` and `bar.google.com`, you could define this mapping:
| PREFIX | TARGET |
| --- | --- |
| `/google/{subdomain}` | `{subdomain}.google.com` |

- Targets must resolve to directories. A target that points at a file, such as `example.com/index.html`, is not supported and can behave unexpectedly.
- URL globbing means mappings that share the same starting path must be ordered with the shortest prefix last. For example, if both `/foo` and `/foo/bar` exist, place `/foo/bar` before `/foo`; otherwise `/foo` will catch the traffic and `/foo/bar` will not be reached.

| ✅ DO | ❌ DON’T |
| --- | --- |
| Requests mapped correctly | Requests for /foo/bar are routed incorrectly to `foo.com`. |
| (Figure: url-mapping-do.png) | (Figure: url-mapping-dont.png) |

