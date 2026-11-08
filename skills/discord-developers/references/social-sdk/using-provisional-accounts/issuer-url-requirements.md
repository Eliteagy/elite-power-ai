# Issuer url requirements
Context: Discord developer reference: Issuer url requirements
[Source](authentication-and-merging-index.md) / [Owning endpoint, event, object or procedure conditions](oidc-integration-requirements.md) / [Following source section](oidc-discovery-document-requirements.md)
<a id="source-issuer-url-requirements"></a>

#### Issuer URL Requirements

 The issuer URL configured in the Developer Portal must satisfy every requirement below:
| Requirement | Details |
| --- | --- |
| HTTPS scheme | Use `https://` because HTTP is not allowed. |
| No query parameters | Do not include a `?` character in the URL. |
| No fragment | Do not include a `#` character in the URL. |
| No embedded credentials | Do not include a username or password in the URL. |
| Public hostname | The hostname needs at least two segments, such as `example.com`; bare hostnames like `localhost` are not allowed. |
| No private or reserved TLDs | The hostname cannot end with `.local`, `.arpa`, `.internal`, or `.localhost`. |
| No IP addresses | The hostname cannot be a bare IP address, such as `192.168.1.1`. |

 Non-standard ports such as `:8080` are allowed.

