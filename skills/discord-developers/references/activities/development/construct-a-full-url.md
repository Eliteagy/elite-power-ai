# Construct a full url
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](local-development.md) / [Previous source section](activity-proxy-considerations.md) / [Following source section](using-external-resources.md)

<a id="source-construct-a-full-url"></a>

### Construct a Full URL

Build a full URL for network request work.

<a id="source-construct-a-full-url"></a>

### Construct A Full URL

 Sometimes a network request needs a full URL instead of a relative URL such as `/path/to/my/thing`. Build that URL from these parts:
1. The protocol to use
2. Your application’s client id
3. The discord proxy domain
4. Whatever you need to list
 This example builds a full URL with the URL constructor:

```
const protocol = `https`;
const clientId = '<YOUR CLIENT ID>';
const proxyDomain = 'discordsays.com';
const resourcePath = '/foo/bar.jpg';
const url = new URL(`${protocol}://${clientId}.${proxyDomain}${resourcePath}`);

```

 For example, with application client id `12345678`
| Relative Path | Full Path |
| --- | --- |
| /foo/bar.jpg | https://12345678.discordsays.com/foo/bar.jpg |

---
