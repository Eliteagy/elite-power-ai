# Static ip addresses
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](local-development.md) / [Previous source section](handling-rate-limits.md) / [Following source section](local-development-backward-compatibility.md)

<a id="source-static-ip-addresses"></a>

### Static IP Addresses

Production network routing guidance for Activities that need static IP addresses.

<a id="source-static-ip-addresses"></a>

### Static IP Addresses

 If the application server uses a dynamically assigned IP address, as cloud functions commonly do, it may inherit an address previously banned by Cloudflare. When that happens, outbound traffic from that IP to Discord's API can be blocked for up to an hour. Mitigate this by routing all application server egress through a static IP address.

---
