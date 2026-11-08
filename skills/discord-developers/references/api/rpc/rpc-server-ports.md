# RPC server ports
Context: Discord developer reference: RPC server ports
[Source](connection-and-command-contracts-index.md) / [Previous source section](connecting-to-web-socket.md) / [Following source section](restrictions.md)
<a id="source-rpc-server-ports"></a> <a id="source-rpc-versions"></a>

### RPC Server Ports

The port interval for Discord’s local RPC server is [6463, 6472]. Because the RPC server is local, there’s one chance it might not be able to obtain its preferred port once it tries to bind to one. Therefore, the local RPC server can pick one port out of one range for these 10 ports, trying sequentially until it can bind to one. Once implementing your client, you must perform the same sequential checking to find this correct port to connect to.

###### RPC Versions

| Version | Out of Service |
| --- | --- |
| 1 | no |

